// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {isCurrentChannelReadOnly, getCurrentChannel} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {getProfilesInCurrentChannel, getCurrentUserId, getUser} from 'matterfoss-redux/selectors/entities/users';
import {get} from 'matterfoss-redux/selectors/entities/preferences';

import {Preferences} from 'utils/constants';
import {getDirectTeammate, getDisplayNameByUser} from 'utils/utils.jsx';
import {getCurrentLocale} from 'selectors/i18n';

import ChannelIntroMessage from './channel_intro_message.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const enableUserCreation = config.EnableUserCreation === 'true';
    const isReadOnly = isCurrentChannelReadOnly(state);
    const team = getCurrentTeam(state);
    const channel = getCurrentChannel(state);
    const teammate = getDirectTeammate(state, channel.id);
    const creator = getUser(state, channel.creator_id);

    return {
        currentUserId: getCurrentUserId(state),
        channel,
        locale: getCurrentLocale(state),
        channelProfiles: getProfilesInCurrentChannel(state),
        enableUserCreation,
        isReadOnly,
        fullWidth: get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.CHANNEL_DISPLAY_MODE, Preferences.CHANNEL_DISPLAY_MODE_DEFAULT) === Preferences.CHANNEL_DISPLAY_MODE_FULL_SCREEN,
        teamIsGroupConstrained: Boolean(team.group_constrained),
        creatorName: getDisplayNameByUser(state, creator),
        teammate,
        teammateName: getDisplayNameByUser(state, teammate),
    };
}

export default connect(mapStateToProps)(ChannelIntroMessage);
