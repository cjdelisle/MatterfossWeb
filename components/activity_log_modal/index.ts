// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getSessions, revokeSession} from 'matterfoss-redux/actions/users';
import {getCurrentUserId, getUserSessions} from 'matterfoss-redux/selectors/entities/users';
import {ActionFunc, GenericAction} from 'matterfoss-redux/types/actions';

import {getCurrentLocale} from 'selectors/i18n';
import {GlobalState} from 'types/store';

import ActivityLogModal, {Props} from './activity_log_modal';

function mapStateToProps(state: GlobalState) {
    return {
        currentUserId: getCurrentUserId(state),
        sessions: getUserSessions(state),
        locale: getCurrentLocale(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc| GenericAction>, Props['actions']>({
            getSessions,
            revokeSession,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogModal);
