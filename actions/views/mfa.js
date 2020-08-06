// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import * as UserActions from 'matterfoss-redux/actions/users';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';

export function activateMfa(code) {
    return (dispatch, getState) => {
        const currentUserId = getCurrentUserId(getState());

        return dispatch(UserActions.updateUserMfa(currentUserId, true, code));
    };
}

export function deactivateMfa() {
    return (dispatch, getState) => {
        const currentUserId = getCurrentUserId(getState());

        return dispatch(UserActions.updateUserMfa(currentUserId, false));
    };
}

export function generateMfaSecret() {
    return (dispatch, getState) => {
        const currentUserId = getCurrentUserId(getState());

        return dispatch(UserActions.generateMfaSecret(currentUserId));
    };
}

