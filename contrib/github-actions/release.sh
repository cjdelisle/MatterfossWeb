#!/bin/bash

function publish() {
  local dist
  dist="${1}"

  if [ ! -e "${dist}" ];
  then
      echo 'Invalid pre-built dist ('"${dist}"')'

      return 1
  fi

  local node_modules
  node_modules="${2}"

  if [ ! -e "${node_modules}" ];
  then
      echo 'Invalid pre-built dist ('"${node_modules}"')'

      return 1
  fi

  local dist_checksum
  dist_checksum="$(sha256sum "${dist}" | cut -d ' ' -f 1)"

  local node_modules_checksum
  node_modules_checksum="$(sha256sum "${dist}" | cut -d ' ' -f 1)"

  local base_url
  base_url='https://api.github.com/repos/'"${GITHUB_REPOSITORY}"

  local upload_url
  upload_url="$(curl \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "${base_url}"/releases 2>> /dev/null | \
    jq -r '.[] | .upload_url' | \
    head -n1)"

  upload_url=${upload_url/\{?name,label\}/}

  local release_name
  release_name="$(curl \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "${base_url}"/releases 2>> /dev/null | \
    jq -r '.[] | .tag_name' | \
    head -n1)"

  curl \
    -X POST \
    --data-binary @"${dist}" \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "${upload_url}?name=${release_name}-pre-built-dist"

  curl \
    -X POST \
    --data "${dist_checksum}" \
    -H 'Content-Type: text/plain' \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "${upload_url}?name=${release_name}-pre-built-dist.sha256sum"

    curl \
    -X POST \
    --data-binary @"${node_modules}" \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "${upload_url}?name=${release_name}-pre-built-dist"

    curl \
    -X POST \
    --data "${node_modules_checksum}" \
    -H 'Content-Type: text/plain' \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    "${upload_url}?name=${release_name}-node_modules.sha256sum"
}

publish "${GITHUB_WORKSPACE}/${RELEASE_NAME}-pre-built-dist" "${GITHUB_WORKSPACE}/${RELEASE_NAME}-node_modules"
