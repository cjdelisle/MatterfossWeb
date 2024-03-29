// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {ActionFunc} from 'matterfoss-redux/types/actions';

import {updateUserActive, revokeAllSessionsForUser, promoteGuestToUser, demoteUserToGuest} from 'matterfoss-redux/actions/users';
import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {getExternalBotAccounts} from 'matterfoss-redux/selectors/entities/bots';
import {loadBots} from 'matterfoss-redux/actions/bots';

import {getLicense} from 'matterfoss-redux/selectors/entities/general';

import * as Selectors from 'matterfoss-redux/selectors/entities/admin';

import {GlobalState} from 'types/store';

import SystemUsersDropdown, {Props} from './system_users_dropdown';

function mapStateToProps(state: GlobalState) {
    const bots = getExternalBotAccounts(state);
    const license = getLicense(state);
    return {
        isLicensed: license && license.IsLicensed === 'true',
        config: Selectors.getConfig(state),
        currentUser: getCurrentUser(state),
        bots,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            updateUserActive,
            revokeAllSessionsForUser,
            promoteGuestToUser,
            demoteUserToGuest,
            loadBots,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemUsersDropdown);
