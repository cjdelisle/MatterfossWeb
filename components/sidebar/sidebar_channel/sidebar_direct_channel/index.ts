// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {savePreferences} from 'matterfoss-redux/actions/preferences';
import {ActionFunc} from 'matterfoss-redux/types/actions';
import {PreferenceType} from 'matterfoss-redux/types/preferences';
import {GlobalState} from 'matterfoss-redux/types/store';
import {Channel} from 'matterfoss-redux/types/channels';
import {getCurrentChannelId, getRedirectChannelNameForTeam} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUser, getUser} from 'matterfoss-redux/selectors/entities/users';

import {leaveDirectChannel} from 'actions/views/channel';

import SidebarDirectChannel from './sidebar_direct_channel';

type OwnProps = {
    channel: Channel;
    currentTeamName: string;
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const teammate = getUser(state, ownProps.channel.teammate_id!);
    const currentUser = getCurrentUser(state);
    const currentTeam = getCurrentTeam(state);
    const redirectChannel = getRedirectChannelNameForTeam(state, currentTeam.id);
    const currentChannelId = getCurrentChannelId(state);
    const active = ownProps.channel.id === currentChannelId;

    return {
        teammate,
        currentUserId: currentUser.id,
        redirectChannel,
        active,
    };
}

type Actions = {
    savePreferences: (userId: string, preferences: PreferenceType[]) => Promise<{
        data: boolean;
    }>;
    leaveDirectChannel: (channelId: string) => Promise<{data: boolean}>;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            savePreferences,
            leaveDirectChannel,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarDirectChannel);
