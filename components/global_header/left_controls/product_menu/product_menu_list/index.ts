// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {Action} from 'matterfoss-redux/types/actions';

import {getInt, isCustomGroupsEnabled} from 'matterfoss-redux/selectors/entities/preferences';
import {
    getConfig,
    getFirstAdminVisitMarketplaceStatus,
} from 'matterfoss-redux/selectors/entities/general';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {haveICurrentTeamPermission, haveISystemPermission} from 'matterfoss-redux/selectors/entities/roles';
import {Permissions} from 'matterfoss-redux/constants';
import {GlobalState} from 'types/store';
import {OnboardingTaskCategory, OnboardingTasksName, TaskNameMapToSteps} from 'components/onboarding_tasks';
import {openModal} from 'actions/views/modals';
import {ModalData} from 'types/actions';

import ProductMenuList from './product_menu_list';

type Actions = {
    openModal: <P>(modalData: ModalData<P>) => void;
}

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const currentTeam = getCurrentTeam(state) || {};
    const currentUser = getCurrentUser(state);

    const appDownloadLink = config.AppDownloadLink || '';
    const enableCommands = config.EnableCommands === 'true';
    const siteName = config.SiteName || 'MatterFOSS';
    const enableIncomingWebhooks = config.EnableIncomingWebhooks === 'true';
    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true';
    const enableOutgoingWebhooks = config.EnableOutgoingWebhooks === 'true';
    const enablePluginMarketplace = config.PluginsEnabled === 'true' && config.EnableMarketplace === 'true';
    const canManageTeamIntegrations = (haveICurrentTeamPermission(state, Permissions.MANAGE_SLASH_COMMANDS) || haveICurrentTeamPermission(state, Permissions.MANAGE_OAUTH) || haveICurrentTeamPermission(state, Permissions.MANAGE_INCOMING_WEBHOOKS) || haveICurrentTeamPermission(state, Permissions.MANAGE_OUTGOING_WEBHOOKS));
    const canManageSystemBots = (haveISystemPermission(state, {permission: Permissions.MANAGE_BOTS}) || haveISystemPermission(state, {permission: Permissions.MANAGE_OTHERS_BOTS}));
    const canManageIntegrations = canManageTeamIntegrations || canManageSystemBots;
    const step = getInt(state, OnboardingTaskCategory, OnboardingTasksName.VISIT_SYSTEM_CONSOLE, 0);
    const showVisitSystemConsoleTour = step === TaskNameMapToSteps[OnboardingTasksName.VISIT_SYSTEM_CONSOLE].STARTED;
    const enableCustomUserGroups = isCustomGroupsEnabled(state);

    return {
        isMobile: state.views.channel.mobileView,
        appDownloadLink,
        enableCommands,
        canManageIntegrations,
        enableIncomingWebhooks,
        enableOAuthServiceProvider,
        enableOutgoingWebhooks,
        canManageSystemBots,
        enablePluginMarketplace,
        pluginMenuItems: state.plugins.components.MainMenu,
        siteName,
        teamId: currentTeam.id,
        teamName: currentTeam.name,
        currentUser,
        firstAdminVisitMarketplaceStatus: getFirstAdminVisitMarketplaceStatus(state),
        showVisitSystemConsoleTour,
        enableCustomUserGroups,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            openModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductMenuList);
