// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {UserProfile} from 'matterfoss-redux/types/users';

import {patchUser} from 'matterfoss-redux/actions/users';
import {ActionFunc, ActionResult} from 'matterfoss-redux/types/actions';

import ResetEmailModal from './reset_email_modal';

type Actions = {
    patchUser: (user: UserProfile) => ActionResult;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            patchUser,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(ResetEmailModal);
