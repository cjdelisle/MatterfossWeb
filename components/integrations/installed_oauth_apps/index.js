// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from 'matterfoss-redux/actions/integrations';
import {getOAuthApps} from 'matterfoss-redux/selectors/entities/integrations';
import {haveISystemPermission} from 'matterfoss-redux/selectors/entities/roles';
import {Permissions} from 'matterfoss-redux/constants';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';

import {loadOAuthAppsAndProfiles} from 'actions/integration_actions';

import InstalledOAuthApps from './installed_oauth_apps.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true';

    return {
        canManageOauth: haveISystemPermission(state, {permission: Permissions.MANAGE_OAUTH}),
        oauthApps: getOAuthApps(state),
        enableOAuthServiceProvider,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadOAuthAppsAndProfiles,
            regenOAuthAppSecret: Actions.regenOAuthAppSecret,
            deleteOAuthApp: Actions.deleteOAuthApp,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledOAuthApps);
