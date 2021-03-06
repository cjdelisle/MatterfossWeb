// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {shouldShowTermsOfService, getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {getTeam} from 'matterfoss-redux/selectors/entities/teams';

import {getWarnMetricsStatus} from 'matterfoss-redux/actions/general';

import {loadMeAndConfig} from 'actions/views/root';
import LocalStorageStore from 'stores/local_storage_store';

import Root from './root.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    const showTermsOfService = shouldShowTermsOfService(state);
    const plugins = state.plugins.components.CustomRouteComponent;

    const teamId = LocalStorageStore.getPreviousTeamId(getCurrentUserId(state));
    const permalinkRedirectTeam = getTeam(state, teamId);

    return {
        diagnosticsEnabled: config.DiagnosticsEnabled === 'true',
        noAccounts: config.NoAccounts === 'true',
        diagnosticId: config.DiagnosticId,
        permalinkRedirectTeamName: permalinkRedirectTeam ? permalinkRedirectTeam.name : '',
        showTermsOfService,
        plugins,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadMeAndConfig,
            getWarnMetricsStatus,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
