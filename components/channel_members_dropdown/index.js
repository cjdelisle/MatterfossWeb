// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getChannelStats, updateChannelMemberSchemeRoles, removeChannelMember, getChannelMember} from 'matterfoss-redux/actions/channels';
import {haveIChannelPermission} from 'matterfoss-redux/selectors/entities/roles';
import {getLicense} from 'matterfoss-redux/selectors/entities/general';
import {Permissions} from 'matterfoss-redux/constants';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';

import {canManageMembers} from 'utils/channel_utils.jsx';

import ChannelMembersDropdown from './channel_members_dropdown.jsx';

function mapStateToProps(state, ownProps) {
    const {channel} = ownProps;
    const canChangeMemberRoles = haveIChannelPermission(
        state,
        {
            channel: channel.id,
            team: channel.team_id,
            permission: Permissions.MANAGE_CHANNEL_ROLES,
        },
    ) && canManageMembers(state, channel);
    const license = getLicense(state);
    const isLicensed = license.IsLicensed === 'true';
    const canRemoveMember = canManageMembers(state, channel);

    return {
        currentUserId: getCurrentUserId(state),
        isLicensed,
        canChangeMemberRoles,
        canRemoveMember,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getChannelMember,
            getChannelStats,
            updateChannelMemberSchemeRoles,
            removeChannelMember,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMembersDropdown);
