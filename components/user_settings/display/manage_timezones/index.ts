// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {updateMe} from 'matterfoss-redux/actions/users';
import {ActionFunc, ActionResult} from 'matterfoss-redux/types/actions';
import {UserProfile} from 'matterfoss-redux/types/users';
import {getSupportedTimezones} from 'matterfoss-redux/selectors/entities/general';
import {GlobalState} from 'matterfoss-redux/types/store';

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
    return {
        timezones: getSupportedTimezones(state),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageTimezones);

