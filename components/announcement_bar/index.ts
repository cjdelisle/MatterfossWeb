// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {Permissions} from 'matterfoss-redux/constants';
import {haveISystemPermission} from 'matterfoss-redux/selectors/entities/roles';
import {getConfig, getLicense, warnMetricsStatus as getWarnMetricsStatus} from 'matterfoss-redux/selectors/entities/general';
import {getDisplayableErrors} from 'matterfoss-redux/selectors/errors';
import {dismissError} from 'matterfoss-redux/actions/errors';
import {getStandardAnalytics} from 'matterfoss-redux/actions/admin';
import {GenericAction} from 'matterfoss-redux/types/actions';
import {getCloudSubscription, getCloudCustomer, getSubscriptionStats} from 'matterfoss-redux/actions/cloud';
import {isCurrentUserSystemAdmin} from 'matterfoss-redux/selectors/entities/users';

import {dismissNotice} from 'actions/views/notice';
import {GlobalState} from 'types/store';

import AnnouncementBarController from './announcement_bar_controller';

function mapStateToProps(state: GlobalState) {
    const canViewSystemErrors = haveISystemPermission(state, {permission: Permissions.MANAGE_SYSTEM});
    const license = getLicense(state);
    const config = getConfig(state);
    const errors = getDisplayableErrors(state);
    const warnMetricsStatus = getWarnMetricsStatus(state);
    const isCloud = license.Cloud === 'true';
    const subscription = state.entities.cloud?.subscription;
    const userIsAdmin = isCurrentUserSystemAdmin(state);

    let latestError = null;
    if (errors && errors.length >= 1) {
        latestError = errors[0];
    }

    return {
        license,
        config,
        canViewSystemErrors,
        latestError,
        warnMetricsStatus,
        isCloud,
        subscription,
        userIsAdmin,
    };
}

//
function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    const dismissFirstError = dismissError.bind(null, 0);
    return {
        actions: bindActionCreators({
            getStandardAnalytics,
            dismissError: dismissFirstError,
            dismissNotice,
            getCloudSubscription,
            getCloudCustomer,
            getSubscriptionStats,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementBarController);
