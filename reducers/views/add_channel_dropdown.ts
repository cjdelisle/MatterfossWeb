// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {combineReducers} from 'redux';

import {GenericAction} from 'matterfoss-redux/types/actions';

import {ActionTypes} from 'utils/constants';

export function isOpen(state = false, action: GenericAction) {
    switch (action.type) {
    case ActionTypes.ADD_CHANNEL_DROPDOWN_TOGGLE:
        return action.open;
    default:
        return state;
    }
}

export default combineReducers({
    isOpen,
});
