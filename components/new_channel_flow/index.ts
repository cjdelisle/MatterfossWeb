// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import Permissions from 'matterfoss-redux/constants/permissions';
import {getCurrentChannelId} from 'matterfoss-redux/selectors/entities/channels';
import {haveIChannelPermission} from 'matterfoss-redux/selectors/entities/roles';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {ActionFunc, GenericAction} from 'matterfoss-redux/types/actions';
import {createChannel} from 'matterfoss-redux/actions/channels';
import {GlobalState} from 'matterfoss-redux/types/store';

import {switchToChannel} from 'actions/views/channel';
import {closeModal} from 'actions/views/modals';

import NewChannelFlow, {Props} from './new_channel_flow';

function mapStateToProps(state: GlobalState) {
    const currentTeam = getCurrentTeam(state);
    const currentChannelId = getCurrentChannelId(state);

    let canCreatePublicChannel = false;
    let canCreatePrivateChannel = false;

    if (currentTeam) {
        canCreatePublicChannel = haveIChannelPermission(state, {channel: currentChannelId, team: currentTeam.id, permission: Permissions.CREATE_PUBLIC_CHANNEL});
        canCreatePrivateChannel = haveIChannelPermission(state, {channel: currentChannelId, team: currentTeam.id, permission: Permissions.CREATE_PRIVATE_CHANNEL});
    }

    return {
        currentTeamId: currentTeam.id,
        canCreatePrivateChannel,
        canCreatePublicChannel,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            createChannel,
            switchToChannel,
            closeModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChannelFlow);
