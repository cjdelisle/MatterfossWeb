// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {createSelector} from 'reselect';

import {Preferences} from 'matterfoss-redux/constants';
import {getChannelNameToDisplayNameMap} from 'matterfoss-redux/selectors/entities/channels';
import {getAutolinkedUrlSchemes, getConfig, getManagedResourcePaths} from 'matterfoss-redux/selectors/entities/general';
import {getBool} from 'matterfoss-redux/selectors/entities/preferences';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {getAllUserMentionKeys} from 'matterfoss-redux/selectors/entities/search';

import {GlobalState} from 'matterfoss-redux/types/store';

import {getEmojiMap} from 'selectors/emojis';
import {getSiteURL} from 'utils/url';
import {ChannelNamesMap, MentionKey} from 'utils/text_formatting';

import {getPost} from 'matterfoss-redux/selectors/entities/posts';

import Markdown from './markdown';

type Props = {
    channelNamesMap?: ChannelNamesMap;
    mentionKeys?: MentionKey[];
    postId?: string;
}

function makeGetChannelNamesMap() {
    return createSelector(
        'makeGetChannelNamesMap',
        getChannelNameToDisplayNameMap,
        (state: GlobalState, props: Props) => props && props.channelNamesMap,
        (channelNamesMap, channelMentions) => {
            if (channelMentions) {
                return Object.assign({}, channelMentions, channelNamesMap);
            }

            return channelNamesMap;
        },
    );
}

function makeMapStateToProps() {
    const getChannelNamesMap = makeGetChannelNamesMap();

    return function mapStateToProps(state: GlobalState, ownProps: Props) {
        const config = getConfig(state);

        let channelId;
        if (ownProps.postId) {
            channelId = getPost(state, ownProps.postId)?.channel_id;
        }

        return {
            autolinkedUrlSchemes: getAutolinkedUrlSchemes(state),
            channelNamesMap: getChannelNamesMap(state, ownProps),
            enableFormatting: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'formatting', true),
            managedResourcePaths: getManagedResourcePaths(state),
            mentionKeys: ownProps.mentionKeys || getAllUserMentionKeys(state),
            siteURL: getSiteURL(),
            team: getCurrentTeam(state),
            hasImageProxy: config.HasImageProxy === 'true',
            minimumHashtagLength: parseInt(config.MinimumHashtagLength || '', 10),
            emojiMap: getEmojiMap(state),
            channelId,
        };
    };
}

export default connect(makeMapStateToProps)(Markdown);
