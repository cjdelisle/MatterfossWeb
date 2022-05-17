// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {getChannelStats} from 'matterfoss-redux/actions/channels';
import {
    getMyTeamMembers,
    getMyTeamUnreads,
    getTeamStats,
    getTeamMember,
    updateTeamMemberSchemeRoles,
} from 'matterfoss-redux/actions/teams';
import {getUser, updateUserActive} from 'matterfoss-redux/actions/users';
import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {getCurrentRelativeTeamUrl, getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {isCollapsedThreadsEnabled} from 'matterfoss-redux/selectors/entities/preferences';

import {GlobalState} from 'matterfoss-redux/types/store';

import {GenericAction} from 'matterfoss-redux/types/actions';

import {removeUserFromTeamAndGetStats} from 'actions/team_actions.jsx';

import TeamMembersDropdown from './team_members_dropdown';

function mapStateToProps(state: GlobalState) {
    return {
        currentUser: getCurrentUser(state),
        teamUrl: getCurrentRelativeTeamUrl(state),
        currentTeam: getCurrentTeam(state),
        collapsedThreads: isCollapsedThreadsEnabled(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            getMyTeamMembers,
            getMyTeamUnreads,
            getUser,
            getTeamMember,
            getTeamStats,
            getChannelStats,
            updateUserActive,
            updateTeamMemberSchemeRoles,
            removeUserFromTeamAndGetStats,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMembersDropdown);
