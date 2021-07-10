// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Permissions} from 'matterfoss-redux/constants';
import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {haveISystemPermission} from 'matterfoss-redux/selectors/entities/roles';
import {getConfig, getLicense, warnMetricsStatus as getWarnMetricsStatus} from 'matterfoss-redux/selectors/entities/general';
import {getDisplayableErrors} from 'matterfoss-redux/selectors/errors';
import {dismissError} from 'matterfoss-redux/actions/errors';
import {getStandardAnalytics} from 'matterfoss-redux/actions/admin';

import {dismissNotice} from 'actions/views/notice';

import AnnouncementBarController from './announcement_bar_controller.jsx';

function mapStateToProps(state) {
    const canViewSystemErrors = haveISystemPermission(state, {permission: Permissions.MANAGE_SYSTEM});
    const license = getLicense(state);
    const config = getConfig(state);
    const user = getCurrentUser(state);
    const errors = getDisplayableErrors(state);
    const warnMetricsStatus = getWarnMetricsStatus(state);

    const totalUsers = state.entities.admin.analytics.TOTAL_USERS;
    let latestError = null;
    if (errors && errors.length >= 1) {
        latestError = errors[0];
    }

    return {
        license,
        config,
        user,
        canViewSystemErrors,
        latestError,
        totalUsers,
        warnMetricsStatus,
    };
}

function mapDispatchToProps(dispatch) {
    const dismissFirstError = dismissError.bind(null, 0);
    return {
        actions: bindActionCreators({
            getStandardAnalytics,
            dismissError: dismissFirstError,
            dismissNotice,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementBarController);
