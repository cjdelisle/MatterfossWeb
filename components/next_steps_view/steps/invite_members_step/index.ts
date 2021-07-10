// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {sendEmailInvitesToTeamGracefully, regenerateTeamInviteId} from 'matterfoss-redux/actions/teams';
import {getConfig, getLicense, getSubscriptionStats} from 'matterfoss-redux/selectors/entities/general';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {GenericAction, ActionFunc} from 'matterfoss-redux/types/actions';
import {ServerError} from 'matterfoss-redux/types/errors';
import {TeamInviteWithError} from 'matterfoss-redux/types/teams';

import {GlobalState} from 'types/store';

import InviteMembersStep from './invite_members_step';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    return {
        team: getCurrentTeam(state),
        isEmailInvitesEnabled: config.EnableEmailInvitations === 'true',
        isCloud: getLicense(state).Cloud === 'true',
        cloudUserLimit: config.ExperimentalCloudUserLimit || 10,
        subscriptionStats: getSubscriptionStats(state),
    };
}

type Actions = {
    sendEmailInvitesToTeamGracefully: (teamId: string, emails: string[]) => Promise<{ data: TeamInviteWithError[]; error: ServerError }>;
    regenerateTeamInviteId: (teamId: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            sendEmailInvitesToTeamGracefully,
            regenerateTeamInviteId,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteMembersStep);
