// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {
    getConfig,
    getLicense,
    getSubscriptionStats as selectSubscriptionStats,
} from 'matterfoss-redux/selectors/entities/general';
import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {getSubscriptionStats} from 'matterfoss-redux/actions/cloud';

import {GlobalState} from 'types/store';

import {isAdmin} from 'utils/utils.jsx';

import InvitationModalGuestsStep from './invitation_modal_guests_step';

function mapStateToProps(state: GlobalState) {
    return {
        userLimit: getConfig(state).ExperimentalCloudUserLimit,
        userIsAdmin: isAdmin(getCurrentUser(state).roles),
        isCloud: getLicense(state).Cloud === 'true',
        subscriptionStats: selectSubscriptionStats(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators({getSubscriptionStats}, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationModalGuestsStep);
