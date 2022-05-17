// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {GlobalState} from 'matterfoss-redux/types/store';

import UserSettings from './user_settings';

function mapStateToProps(state: GlobalState) {
    return {
        user: getCurrentUser(state),
    };
}

export default connect(mapStateToProps)(UserSettings);
