// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {withRouter} from 'react-router-dom';

import {GenericAction} from 'matterfoss-redux/types/actions';

import {
    getConfig,
} from 'matterfoss-redux/selectors/entities/general';
import {
    getJoinableTeamIds,
    getCurrentTeam,
    getCurrentRelativeTeamUrl,
} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUser, isFirstAdmin} from 'matterfoss-redux/selectors/entities/users';
import {getUseCaseOnboarding} from 'matterfoss-redux/selectors/entities/preferences';
import {haveICurrentTeamPermission, haveISystemPermission} from 'matterfoss-redux/selectors/entities/roles';

import {getSubscriptionStats} from 'matterfoss-redux/actions/cloud';
import {Permissions} from 'matterfoss-redux/constants';

import {RHSStates} from 'utils/constants';

import {unhideNextSteps} from 'actions/views/next_steps';
import {showMentions, showFlaggedPosts, closeRightHandSide, closeMenu as closeRhsMenu} from 'actions/views/rhs';
import {openModal} from 'actions/views/modals';
import {getRhsState} from 'selectors/rhs';

import {
    showOnboarding,
    showNextSteps,
} from 'components/next_steps_view/steps';

import {GlobalState} from 'types/store';

import MainMenu from './main_menu';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const currentTeam = getCurrentTeam(state);
    const currentUser = getCurrentUser(state);

    const appDownloadLink = config.AppDownloadLink;
    const enableCommands = config.EnableCommands === 'true';
    const siteName = config.SiteName;
    const enableIncomingWebhooks = config.EnableIncomingWebhooks === 'true';
    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true';
    const enableOutgoingWebhooks = config.EnableOutgoingWebhooks === 'true';
    const experimentalPrimaryTeam = config.ExperimentalPrimaryTeam;
    const helpLink = config.HelpLink;
    const reportAProblemLink = config.ReportAProblemLink;

    const canManageTeamIntegrations = (haveICurrentTeamPermission(state, Permissions.MANAGE_SLASH_COMMANDS) || haveICurrentTeamPermission(state, Permissions.MANAGE_OAUTH) || haveICurrentTeamPermission(state, Permissions.MANAGE_INCOMING_WEBHOOKS) || haveICurrentTeamPermission(state, Permissions.MANAGE_OUTGOING_WEBHOOKS));
    const canManageSystemBots = (haveISystemPermission(state, {permission: Permissions.MANAGE_BOTS}) || haveISystemPermission(state, {permission: Permissions.MANAGE_OTHERS_BOTS}));
    const canManageIntegrations = canManageTeamIntegrations || canManageSystemBots;
    const canInviteTeamMember = haveICurrentTeamPermission(state, Permissions.ADD_USER_TO_TEAM);

    const joinableTeams = getJoinableTeamIds(state);
    const moreTeamsToJoin = joinableTeams && joinableTeams.length > 0;
    const rhsState = getRhsState(state);

    return {
        appDownloadLink,
        enableCommands,
        canManageIntegrations,
        enableIncomingWebhooks,
        enableOAuthServiceProvider,
        enableOutgoingWebhooks,
        canManageSystemBots,
        experimentalPrimaryTeam,
        helpLink,
        reportAProblemLink,
        pluginMenuItems: state.plugins.components.MainMenu,
        moreTeamsToJoin,
        siteName,
        teamId: currentTeam.id,
        teamName: currentTeam.name,
        currentUser,
        isMentionSearch: rhsState === RHSStates.MENTION,
        teamIsGroupConstrained: Boolean(currentTeam.group_constrained),
        isLicensedForLDAPGroups: state.entities.general.license.LDAPGroups === 'true',
        showGettingStarted: showOnboarding(state),
        showDueToStepsNotFinished: showNextSteps(state),
        teamUrl: getCurrentRelativeTeamUrl(state),
        guestAccessEnabled: config.EnableGuestAccounts === 'true',
        canInviteTeamMember,
        isFirstAdmin: isFirstAdmin(state),
        useCaseOnboarding: getUseCaseOnboarding(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            openModal,
            showMentions,
            showFlaggedPosts,
            closeRightHandSide,
            closeRhsMenu,
            unhideNextSteps,
            getSubscriptionStats,
        }, dispatch),
    };
}

export default withRouter<any, any>(connect(mapStateToProps, mapDispatchToProps)(MainMenu));
