// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {regenOAuthAppSecret, deleteOAuthApp} from 'matterfoss-redux/actions/integrations';
import {getAppsOAuthAppIDs, getOAuthApps} from 'matterfoss-redux/selectors/entities/integrations';
import {haveISystemPermission} from 'matterfoss-redux/selectors/entities/roles';
import {Permissions} from 'matterfoss-redux/constants';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';

import {GlobalState} from 'matterfoss-redux/types/store';

import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';

import {GenericAction} from 'matterfoss-redux/types/actions';

import {loadOAuthAppsAndProfiles} from 'actions/integration_actions';

import InstalledOAuthApps from './installed_oauth_apps';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true';

    return {
        canManageOauth: haveISystemPermission(state, {permission: Permissions.MANAGE_OAUTH}),
        oauthApps: getOAuthApps(state),
        appsOAuthAppIDs: getAppsOAuthAppIDs(state),
        enableOAuthServiceProvider,
        team: getCurrentTeam(state),
    };
}

type Actions = {
    loadOAuthAppsAndProfiles: (page?: number, perPage?: number) => Promise<void>;
    regenOAuthAppSecret: (appId: string) => Promise<{ error?: Error }>;
    deleteOAuthApp: (appId: string) => Promise<void>;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject, Actions>({
            loadOAuthAppsAndProfiles,
            regenOAuthAppSecret,
            deleteOAuthApp,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledOAuthApps);
