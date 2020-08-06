// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {removeReaction} from 'matterfoss-redux/actions/posts';
import {getMissingProfilesByIds} from 'matterfoss-redux/actions/users';
import {getCurrentUserId, makeGetProfilesForReactions, getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {getChannel} from 'matterfoss-redux/selectors/entities/channels';
import {getCustomEmojisByName} from 'matterfoss-redux/selectors/entities/emojis';
import {getEmojiImageUrl} from 'matterfoss-redux/utils/emoji_utils';
import {getTeammateNameDisplaySetting} from 'matterfoss-redux/selectors/entities/preferences';
import {haveIChannelPermission} from 'matterfoss-redux/selectors/entities/roles';
import Permissions from 'matterfoss-redux/constants/permissions';
import Constants from 'matterfoss-redux/constants/general';
import {getConfig, getLicense} from 'matterfoss-redux/selectors/entities/general';

import {addReaction} from 'actions/post_actions.jsx';

import * as Emoji from 'utils/emoji.jsx';
import {getSortedUsers} from 'utils/utils.jsx';

import Reaction from './reaction.jsx';

function makeMapStateToProps() {
    const getProfilesForReactions = makeGetProfilesForReactions();

    return function mapStateToProps(state, ownProps) {
        const config = getConfig(state);
        const license = getLicense(state);
        const me = getCurrentUser(state);

        const profiles = getProfilesForReactions(state, ownProps.reactions);
        let emoji;
        if (Emoji.EmojiIndicesByAlias.has(ownProps.emojiName)) {
            emoji = Emoji.Emojis[Emoji.EmojiIndicesByAlias.get(ownProps.emojiName)];
        } else {
            const emojis = getCustomEmojisByName(state);
            emoji = emojis.get(ownProps.emojiName);
        }

        let emojiImageUrl = '';
        if (emoji) {
            emojiImageUrl = getEmojiImageUrl(emoji);
        }
        const channel = getChannel(state, ownProps.post.channel_id) || {};
        const channelIsArchived = channel.delete_at !== 0;
        const teamId = channel.team_id;
        const currentUserId = getCurrentUserId(state);
        const teammateNameDisplaySetting = getTeammateNameDisplaySetting(state);
        let canAddReaction = false;
        let canRemoveReaction = false;

        if (!channelIsArchived) {
            canAddReaction = checkReactionAction(state, teamId, ownProps.post.channel_id, channel.name, config, license, me, Permissions.REMOVE_REACTION);
            canRemoveReaction = checkReactionAction(state, teamId, ownProps.post.channel_id, channel.name, config, license, me, Permissions.ADD_REACTION);
        }

        return {
            profiles,
            otherUsersCount: ownProps.reactions.length - profiles.length,
            currentUserId,
            reactionCount: ownProps.reactions.length,
            canAddReaction,
            canRemoveReaction,
            emojiImageUrl,
            sortedUsers: getSortedUsers(ownProps.reactions, currentUserId, profiles, teammateNameDisplaySetting),
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addReaction,
            removeReaction,
            getMissingProfilesByIds,
        }, dispatch),
    };
}

function checkReactionAction(state, teamId, channelId, channelName, config, license, user, permission) {
    if (!haveIChannelPermission(state, {team: teamId, channel: channelId, permission})) {
        return false;
    }

    if (channelName === Constants.DEFAULT_CHANNEL && config.ExperimentalTownSquareIsReadOnly === 'true' && license.IsLicensed === 'true' && !user.roles.includes('system_admin')) {
        return false;
    }

    return true;
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Reaction);
