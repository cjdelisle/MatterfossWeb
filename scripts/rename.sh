#!/usr/bin/env bash

change_files() {
    find . -type f -exec grep -Iq . {} \; -print | \
        grep -v '.git' | \
        grep -v '^./\(vendor\|LICENSE\|NOTICE\|go\.\)' | \
        grep -v '.go.tmpl\|/rename.sh' | \
    while read -r x; do
        gawk -i inplace '{
            gsub(/mattermost/, "matterfoss");
            gsub(/Mattermost/, "Matterfoss");

            /* Revert things that we actually dont want to change */
            gsub(/Matterfoss, Inc. All Rights Reserved/, "Mattermost, Inc. All Rights Reserved");

            gsub(/matterfoss\/matterfoss-utilities/, "mattermost/mattermost-utilities");
            gsub(/matterfoss\/eslint-plugin-matterfoss/, "mattermost/eslint-plugin-mattermost");
            gsub(/matterfoss\/react-bootstrap/, "mattermost/react-bootstrap");
            gsub(/matterfoss\/matterfoss-redux/, "mattermost/matterfoss-redux");
            gsub(/matterfoss\/marked/, "mattermost/marked");
            gsub(/matterfoss\/dynamic-virtualized-list/, "mattermost/dynamic-virtualized-list");
            print;
        }' "$x";
    done
    rm -f ./package-lock.json
}

rename_themes() {
    mv images/themes/mattermost.png images/themes/matterfoss.png
    mv images/themes/mattermost_dark.png images/themes/matterfoss_dark.png
}

delete_files() {
    rm -rf ./.circleci
    rm -f ./README.md
    rm -f ./SECURITY.md
    rm -f ./Makefile
    rm -f ./CONTRIBUTING.md
    rm -f ./images/redfavicon.ico ## not used
}

change_files
rename_themes
delete_files
