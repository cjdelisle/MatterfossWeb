// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import timezones from 'timezones.json';

import {updateMe} from 'matterfoss-redux/actions/users';
import {ActionFunc, ActionResult} from 'matterfoss-redux/types/actions';
import {UserProfile} from 'matterfoss-redux/types/users';
import {GlobalState} from 'matterfoss-redux/types/store';
import {getTimezoneLabel} from 'matterfoss-redux/selectors/entities/timezone';

import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';

import ManageTimezones from './manage_timezones';

type Actions = {
    updateMe: (user: UserProfile) => Promise<ActionResult>;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            updateMe,
        }, dispatch)};
}
function mapStateToProps(state: GlobalState) {
    const currentUserId = getCurrentUserId(state);
    const timezoneLabel = getTimezoneLabel(state, currentUserId);
    return {
        timezones,
        timezoneLabel,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageTimezones);

