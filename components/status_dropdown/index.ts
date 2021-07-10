// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {setStatus, unsetCustomStatus} from 'matterfoss-redux/actions/users';
import {Client4} from 'matterfoss-redux/client';
import {getCurrentUser, getStatusForUserId} from 'matterfoss-redux/selectors/entities/users';
import {Preferences} from 'matterfoss-redux/constants';
import {get} from 'matterfoss-redux/selectors/entities/preferences';

import {openModal} from 'actions/views/modals';
import {setStatusDropdown} from 'actions/views/status_dropdown';

import {makeGetCustomStatus, isCustomStatusEnabled, showStatusDropdownPulsatingDot} from 'selectors/views/custom_status';
import {isStatusDropdownOpen} from 'selectors/views/status_dropdown';
import {GenericAction} from 'matterfoss-redux/types/actions';
import {GlobalState} from 'types/store';

import StatusDropdown from './status_dropdown';

function mapStateToProps(state: GlobalState) {
    const currentUser = getCurrentUser(state);
    const getCustomStatus = makeGetCustomStatus();

    const userId = currentUser?.id;
    return {
        userId,
        profilePicture: Client4.getProfilePictureUrl(userId, currentUser?.last_picture_update),
        autoResetPref: get(state, Preferences.CATEGORY_AUTO_RESET_MANUAL_STATUS, userId, ''),
        status: getStatusForUserId(state, userId),
        customStatus: getCustomStatus(state, userId),
        isCustomStatusEnabled: isCustomStatusEnabled(state),
        isStatusDropdownOpen: isStatusDropdownOpen(state),
        showCustomStatusPulsatingDot: showStatusDropdownPulsatingDot(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            openModal,
            setStatus,
            unsetCustomStatus,
            setStatusDropdown,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusDropdown);
