// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {savePreferences} from 'matterfoss-redux/actions/preferences';
import {getProfiles} from 'matterfoss-redux/actions/users';
import {makeGetCategory} from 'matterfoss-redux/selectors/entities/preferences';
import {getCurrentUser, isFirstAdmin, isCurrentUserSystemAdmin} from 'matterfoss-redux/selectors/entities/users';
import {getLicense} from 'matterfoss-redux/selectors/entities/general';
import {selectChannel} from 'matterfoss-redux/actions/channels';

import {setShowNextStepsView} from 'actions/views/next_steps';
import {closeRightHandSide} from 'actions/views/rhs';
import {getIsMobileView} from 'selectors/views/browser';
import {GlobalState} from 'types/store';
import {Preferences} from 'utils/constants';
import {makeAsyncComponent} from 'components/async_load';

import {getSteps} from './steps';

const NextStepsView = makeAsyncComponent('NextStepsView', React.lazy(() => import('./next_steps_view')));

function makeMapStateToProps() {
    const getCategory = makeGetCategory();

    return (state: GlobalState) => {
        return {
            currentUser: getCurrentUser(state),
            isAdmin: isCurrentUserSystemAdmin(state),
            preferences: getCategory(state, Preferences.RECOMMENDED_NEXT_STEPS),
            steps: getSteps(state),
            isFirstAdmin: isFirstAdmin(state),
            isCloud: getLicense(state).Cloud === 'true',
            isMobileView: getIsMobileView(state),
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators(
            {
                savePreferences,
                setShowNextStepsView,
                getProfiles,
                closeRightHandSide,
                selectChannel,
            },
            dispatch,
        ),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(NextStepsView);
