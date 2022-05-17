#!/bin/bash

function publish() {
    local release
    release="${1}"

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
        --data-binary @"${release}_dist.tar.gz" \
        -H 'Content-Type: application/octet-stream' \
        -H "Authorization: Bearer ${GITHUB_TOKEN}" \
        "${upload_url}?name=${release_name}-dist.tar.gz"

    curl \
        -X POST \
        --data-binary @"${release}_dist.tar.gz.SHA256sig" \
        -H 'Content-Type: text/plain' \
        -H "Authorization: Bearer ${GITHUB_TOKEN}" \
        "${upload_url}?name=${release_name}-dist.tar.gz.SHA256sig"

    curl \
        -X POST \
        --data-binary @"${release}_node_modules.tar.gz" \
        -H 'Content-Type: application/octet-stream' \
        -H "Authorization: Bearer ${GITHUB_TOKEN}" \
        "${upload_url}?name=${release_name}-node_modules.tar.gz"

    curl \
        -X POST \
        --data-binary @"${release}_node_modules.tar.gz.SHA256sig" \
        -H 'Content-Type: text/plain' \
        -H "Authorization: Bearer ${GITHUB_TOKEN}" \
        "${upload_url}?name=${release_name}-node_modules.tar.gz.SHA256sig"
}

publish "${GITHUB_WORKSPACE}"'/'"${RELEASE_NAME}"
