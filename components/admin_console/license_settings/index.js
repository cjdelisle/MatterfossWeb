// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getLicenseConfig} from 'matterfoss-redux/actions/general';
import {uploadLicense, removeLicense} from 'matterfoss-redux/actions/admin';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';

import {requestTrialLicense, upgradeToE0Status, upgradeToE0, restartServer, ping} from 'actions/admin_actions';

import LicenseSettings from './license_settings.jsx';

function mapStateToProps(state) {
    const config = getConfig(state);
    return {
        stats: state.entities.admin.analytics,
        upgradedFromTE: config.UpgradedFromTE === 'true',
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getLicenseConfig,
            uploadLicense,
            removeLicense,
            upgradeToE0,
            upgradeToE0Status,
            restartServer,
            ping,
            requestTrialLicense,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LicenseSettings);
