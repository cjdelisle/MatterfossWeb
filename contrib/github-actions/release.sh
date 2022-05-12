#!/bin/bash

set -eu
set -o pipefail

function publish() {
	local project_root_directory
	project_root_directory="${1}"

	local release_name
	release_name="${2}"

	cd "${project_root_directory}" || exit

	local base_url
	base_url='https://api.github.com/repos/'"${GITHUB_REPOSITORY}"

	local upload_url
	upload_url="$(curl \
		-H 'Content-Type: application/octet-stream' \
		-H "Authorization: Bearer ${GITHUB_TOKEN}" \
		"${base_url}"/releases 2>>/dev/null |
		jq -r '.[] | .upload_url' |
		head -n1)"

	upload_url=${upload_url/\{?name,label\}/}

	release_name="$(curl \
		-H 'Content-Type: application/octet-stream' \
		-H "Authorization: Bearer ${GITHUB_TOKEN}" \
		"${base_url}"/releases 2>>/dev/null |
		jq -r '.[] | .tag_name' |
		head -n1)"

	local node_modules_archive
	node_modules_archive="${release_name}_node_modules.tar.gz"

	tar \
		--create \
		--file "./${node_modules_archive}" \
		--gzip \
		--verbose \
		--files-from <(find ./node_modules | \grep -Ev '(tests\/|\.md|LICENSE|\.editorconfig|\.ts$)')

	local node_modules_archive_checksum
	node_modules_archive_checksum="$(sha256sum "./${node_modules_archive}" | cut -d ' ' -f 1)"

	curl \
		-X POST \
		--data-binary @"${project_root_directory}./${node_modules_archive}" \
		-H 'Content-Type: application/octet-stream' \
		-H "Authorization: Bearer ${GITHUB_TOKEN}" \
		"${upload_url}?name=${release_name}-node_modules.tar.gz"

	if [ $? -eq 0 ]; then
		echo 'Uploaded node_modules archive successfully.'
	else
		echo 'Could not upload node_modules archive.' 1>&2

		return 1
	fi

	curl \
		-X POST \
		--data "${node_modules_archive_checksum}" \
		-H 'Content-Type: text/plain' \
		-H "Authorization: Bearer ${GITHUB_TOKEN}" \
		"${upload_url}?name=${release_name}-node_modules.tar.gz.sha256sum"

	if [ $? -eq 0 ]; then
		echo 'Uploaded node_modules archive checksum successfully.'
	else
		echo 'Could not upload node_modules archive checksum.' 1>&2

		return 1
	fi

	local dist_archive
	dist_archive="${release_name}_dist.tar.gz"

	tar \
		--create \
		--file "./${dist_archive}" \
		--gzip \
		--verbose \
		--files-from <(find ./dist)

	local dist_archive_checksum
	dist_archive_checksum="$(sha256sum "./${dist_archive}" | cut -d ' ' -f 1)"

	curl \
		-X POST \
		--data-binary @"${project_root_directory}/${dist_archive}" \
		-H 'Content-Type: application/octet-stream' \
		-H "Authorization: Bearer ${GITHUB_TOKEN}" \
		"${upload_url}?name=${release_name}-pre-built-dist.tar.gz"

	if [ $? -eq 0 ]; then
		echo 'Uploaded prebuilt dist archive successfully.'
	else
		echo 'Could not upload prebuilt dist archive.' 1>&2

		return 1
	fi

	curl \
		-X POST \
		--data "${dist_archive_checksum}" \
		-H 'Content-Type: text/plain' \
		-H "Authorization: Bearer ${GITHUB_TOKEN}" \
		"${upload_url}?name=${release_name}-pre-built-dist.tar.gz.sha256sum"

	if [ $? -eq 0 ]; then
		echo 'Uploaded prebuilt dist archive checksum successfully.'
	else
		echo 'Could not upload prebuilt dist archive checksumq.' 1>&2

		return 1
	fi
}
publish "${GITHUB_WORKSPACE}" ${RELEASE_NAME}

set +eu
set +o pipefail
