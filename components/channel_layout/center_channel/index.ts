// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getProfiles} from 'matterfoss-redux/actions/users';
import {Action, ActionFunc, GenericAction} from 'matterfoss-redux/types/actions';
import {getTeamByName} from 'matterfoss-redux/selectors/entities/teams';
import {getRedirectChannelNameForTeam} from 'matterfoss-redux/selectors/entities/channels';
import {isCollapsedThreadsEnabled, getUseCaseOnboarding} from 'matterfoss-redux/selectors/entities/preferences';
import {getCurrentUserId, isFirstAdmin} from 'matterfoss-redux/selectors/entities/users';
import {setShowNextStepsView} from 'actions/views/next_steps';
import {getIsRhsOpen, getIsRhsMenuOpen} from 'selectors/rhs';
import {getIsLhsOpen} from 'selectors/lhs';
import {getLastViewedChannelNameByTeamName} from 'selectors/local_storage';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {showNextSteps} from 'components/next_steps_view/steps';

import {GlobalState} from 'types/store';

import CenterChannel from './center_channel';

type Props = {
    match: {
        url: string;
        params: {
            team: string;
        };
    };
};

const mapStateToProps = (state: GlobalState, ownProps: Props) => {
    const config = getConfig(state);
    const enableOnboardingFlow = config.EnableOnboardingFlow === 'true';
    const useCaseOnboarding = getUseCaseOnboarding(state);
    let channelName = getLastViewedChannelNameByTeamName(state, ownProps.match.params.team);
    if (!channelName) {
        const team = getTeamByName(state, ownProps.match.params.team);
        channelName = getRedirectChannelNameForTeam(state, team!.id);
    }
    const lastChannelPath = `${ownProps.match.url}/channels/${channelName}`;
    return {
        lastChannelPath,
        lhsOpen: getIsLhsOpen(state),
        rhsOpen: getIsRhsOpen(state),
        rhsMenuOpen: getIsRhsMenuOpen(state),
        isCollapsedThreadsEnabled: isCollapsedThreadsEnabled(state),
        currentUserId: getCurrentUserId(state),
        enableTipsViewRoute: enableOnboardingFlow && showNextSteps(state) && !(useCaseOnboarding && isFirstAdmin(state)),
    };
};

type Actions = {
    setShowNextStepsView: (show: boolean) => Action;
    getProfiles: (page?: number, perPage?: number, options?: Record<string, string | boolean>) => ActionFunc;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc|GenericAction>, Actions>({
            setShowNextStepsView,
            getProfiles,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterChannel);

