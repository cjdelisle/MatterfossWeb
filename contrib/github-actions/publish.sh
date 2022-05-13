#!/bin/bash

function publish() {
    local archive
    archive="${1}"

    if [ ! -e "${archive}" ]; then
        echo 'Invalid archive ('"${archive}"')'

        return 1
    fi

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

    local release_name
    release_name="$(curl \
        -H 'Content-Type: application/octet-stream' \
        -H "Authorization: Bearer ${GITHUB_TOKEN}" \
        "${base_url}"/releases 2>>/dev/null |
        jq -r '.[] | .tag_name' |
        head -n1)"

    curl \
        -X POST \
        --data-binary @"${archive}" \
        -H 'Content-Type: application/octet-stream' \
        -H "Authorization: Bearer ${GITHUB_TOKEN}" \
        "${upload_url}?name=${release_name}-dist.tar.gz"

    curl \
        -X POST \
        --data-binary @"${archive}.SHA256sig" \
        -H 'Content-Type: text/plain' \
        -H "Authorization: Bearer ${GITHUB_TOKEN}" \
        "${upload_url}?name=${release_name}-dist.tar.gz.SHA256sig"
}

publish "${GITHUB_WORKSPACE}"'/'"${RELEASE_NAME}_dist.tar.gz"
