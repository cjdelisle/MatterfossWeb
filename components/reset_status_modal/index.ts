// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'types/store/index.js';

import {ActionFunc, GenericAction} from 'matterfoss-redux/types/actions.js';

import {UserStatus} from 'matterfoss-redux/types/users.js';

import {PreferenceType} from 'matterfoss-redux/types/preferences.js';

import {savePreferences} from 'matterfoss-redux/actions/preferences';
import {setStatus} from 'matterfoss-redux/actions/users';
import {Preferences} from 'matterfoss-redux/constants';
import {get} from 'matterfoss-redux/selectors/entities/preferences';
import {getStatusForUserId} from 'matterfoss-redux/selectors/entities/users';

import {autoResetStatus} from 'actions/user_actions.jsx';

import ResetStatusModal from './reset_status_modal';

function mapStateToProps(state: GlobalState) {
    const {currentUserId} = state.entities.users;
    return {
        autoResetPref: get(state, Preferences.CATEGORY_AUTO_RESET_MANUAL_STATUS, currentUserId, ''),
        currentUserStatus: getStatusForUserId(state, currentUserId),
    };
}

type Actions = {
    autoResetStatus: () => Promise<UserStatus>;
    setStatus: (status: UserStatus) => void;
    savePreferences: (userId: string, preferences: PreferenceType[]) => void;
};

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            autoResetStatus,
            setStatus,
            savePreferences,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetStatusModal);
