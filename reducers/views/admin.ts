// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';

import {UserTypes} from 'matterfoss-redux/action_types';
import type {GenericAction} from 'matterfoss-redux/types/actions';

import {ActionTypes} from 'utils/constants';

const initialState = {
    blocked: false,
    onNavigationConfirmed: null,
    showNavigationPrompt: false,
};

function navigationBlock(state = initialState, action: GenericAction) {
    switch (action.type) {
    case ActionTypes.SET_NAVIGATION_BLOCKED:
        return {...state, blocked: action.blocked};
    case ActionTypes.DEFER_NAVIGATION:
        return {
            ...state,
            onNavigationConfirmed: action.onNavigationConfirmed,
            showNavigationPrompt: true,
        };
    case ActionTypes.CANCEL_NAVIGATION:
        return {
            ...state,
            onNavigationConfirmed: null,
            showNavigationPrompt: false,
        };
    case ActionTypes.CONFIRM_NAVIGATION:
        return {
            ...state,
            blocked: false,
            onNavigationConfirmed: null,
            showNavigationPrompt: false,
        };

    case UserTypes.LOGOUT_SUCCESS:
        return initialState;
    default:
        return state;
    }
}

export default combineReducers({
    navigationBlock,
});
