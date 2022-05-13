#!/bin/bash

set -eu
set -o pipefail

function make_archives() {
	local project_root_directory
	project_root_directory="${1}"

	echo 'Project root directory is: "'"${project_root_directory}"'"'

	local release_name
	release_name="${2}"

	echo 'Release name is: "'"${release_name}"'"'

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

	echo 'Release name (API) is: "'"${release_name}"'"'

	local node_modules_archive
	node_modules_archive="${release_name}_node_modules.tar.gz"

	tar \
		--create \
		--file "./${node_modules_archive}" \
		--gzip \
		--verbose \
		--files-from <(find ./node_modules | \grep -Ev '(tests\/|\.md|LICENSE|\.editorconfig|\.ts$)')

	echo -n "$(sha256sum "./${node_modules_archive}" | cut -d ' ' -f 1) ${release_name}-node_modules.tar.gz" >"${project_root_directory}/${node_modules_archive}.SHA256sig"

	local dist_archive
	dist_archive="${release_name}_dist.tar.gz"

	tar \
		--create \
		--file "./${dist_archive}" \
		--gzip \
		--verbose \
		--files-from <(find ./dist)

	echo -n "$(sha256sum "./${dist_archive}" | cut -d ' ' -f 1) ${release_name}-dist.tar.gz" >"${project_root_directory}/${dist_archive}.SHA256sig"
}
make_archives "${GITHUB_WORKSPACE}" ${RELEASE_NAME}

set +eu
set +o pipefail
