// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getMe, updateUserPassword} from 'matterfoss-redux/actions/users';
import {getAuthorizedOAuthApps, deauthorizeOAuthApp} from 'matterfoss-redux/actions/integrations';
import * as UserUtils from 'matterfoss-redux/utils/user_utils';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {getBool} from 'matterfoss-redux/selectors/entities/preferences';

import {getPasswordConfig} from 'utils/utils.jsx';
import {Preferences} from 'utils/constants';

import SecurityTab from './user_settings_security.jsx';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);

    const tokensEnabled = config.EnableUserAccessTokens === 'true';
    const userHasTokenRole = UserUtils.hasUserAccessTokenRole(ownProps.user.roles) || UserUtils.isSystemAdmin(ownProps.user.roles);

    const enableOAuthServiceProvider = config.EnableOAuthServiceProvider === 'true';
    const enableSignUpWithEmail = config.EnableSignUpWithEmail === 'true';
    const enableSignUpWithGitLab = config.EnableSignUpWithGitLab === 'true';
    const enableSignUpWithGoogle = config.EnableSignUpWithGoogle === 'true';
    const enableLdap = config.EnableLdap === 'true';
    const enableSaml = config.EnableSaml === 'true';
    const enableSignUpWithOffice365 = config.EnableSignUpWithOffice365 === 'true';
    const experimentalEnableAuthenticationTransfer = config.ExperimentalEnableAuthenticationTransfer === 'true';

    return {
        canUseAccessTokens: tokensEnabled && userHasTokenRole,
        enableOAuthServiceProvider,
        enableSignUpWithEmail,
        enableSignUpWithGitLab,
        enableSignUpWithGoogle,
        enableLdap,
        enableSaml,
        enableSignUpWithOffice365,
        experimentalEnableAuthenticationTransfer,
        passwordConfig: getPasswordConfig(config),
        militaryTime: getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.USE_MILITARY_TIME, false),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getMe,
            updateUserPassword,
            getAuthorizedOAuthApps,
            deauthorizeOAuthApp,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityTab);
