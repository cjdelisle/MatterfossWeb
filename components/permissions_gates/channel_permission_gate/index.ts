// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {haveIChannelPermission} from 'matterfoss-redux/selectors/entities/roles';
import {GlobalState} from 'matterfoss-redux/types/store';

import ChannelPermissionGate from './channel_permission_gate';

type Props = {
    channelId?: string;
    teamId?: string;
    permissions: string[];
}

function mapStateToProps(state: GlobalState, ownProps: Props) {
    if (!ownProps.channelId || ownProps.teamId === null || typeof ownProps.teamId === 'undefined') {
        return {hasPermission: false};
    }

    for (const permission of ownProps.permissions) {
        if (haveIChannelPermission(state, ownProps.teamId, ownProps.channelId, permission)) {
            return {hasPermission: true};
        }
    }

    return {hasPermission: false};
}

export default connect(mapStateToProps)(ChannelPermissionGate);
