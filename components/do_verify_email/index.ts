// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {verifyUserEmail, getMe} from 'matterfoss-redux/actions/users';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {getUseCaseOnboarding} from 'matterfoss-redux/selectors/entities/preferences';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {clearErrors, logError} from 'matterfoss-redux/actions/errors';

import {GenericAction} from 'matterfoss-redux/types/actions';

import {GlobalState} from '../../types/store';

import DoVerifyEmail from './do_verify_email';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const siteName = config.SiteName;
    const useCaseOnboarding = getUseCaseOnboarding(state);
    return {
        isLoggedIn: Boolean(getCurrentUserId(state)),
        siteName,
        useCaseOnboarding,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            verifyUserEmail,
            getMe,
            logError,
            clearErrors,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoVerifyEmail);
