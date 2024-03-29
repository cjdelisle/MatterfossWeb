// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ActionTypes} from 'utils/constants';

import {UserTypes} from 'matterfoss-redux/action_types';
import type {GenericAction} from 'matterfoss-redux/types/actions';

import type {ViewsState} from 'types/store/views';

export default function settings(state: ViewsState['settings'] = {activeSection: '', previousActiveSection: ''}, action: GenericAction) {
    switch (action.type) {
    case ActionTypes.UPDATE_ACTIVE_SECTION:
        return {
            activeSection: action.data,
            previousActiveSection: state.activeSection,
        };

    case UserTypes.LOGOUT_SUCCESS:
        return {
            activeSection: '',
            previousActiveSection: '',
        };
    default:
        return state;
    }
}
