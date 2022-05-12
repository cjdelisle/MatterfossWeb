// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {updateMe} from 'matterfoss-redux/actions/users';
import {UserProfile} from 'matterfoss-redux/types/users';
import {ActionFunc, ActionResult} from 'matterfoss-redux/types/actions';

import ManageLanguages from './manage_languages';

type Actions = {
    updateMe: (user: UserProfile) => Promise<ActionResult>;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            updateMe,
        }, dispatch)};
}

export default connect(null, mapDispatchToProps)(ManageLanguages);
