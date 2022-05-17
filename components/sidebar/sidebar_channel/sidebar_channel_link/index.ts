// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {isFirstAdmin} from 'matterfoss-redux/selectors/entities/users';
import {getCurrentUserId, getMyChannelMemberships} from 'matterfoss-redux/selectors/entities/common';
import {getInt} from 'matterfoss-redux/selectors/entities/preferences';
import {Channel} from 'matterfoss-redux/types/channels';
import {GenericAction} from 'matterfoss-redux/types/actions';
import {isChannelMuted} from 'matterfoss-redux/utils/channel_utils';
import {makeGetChannelUnreadCount} from 'matterfoss-redux/selectors/entities/channels';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {clearChannelSelection, multiSelectChannelAdd, multiSelectChannelTo} from 'actions/views/channel_sidebar';
import {getFirstChannelName} from 'selectors/onboarding';
import {unsetEditingPost} from 'actions/post_actions';
import {isChannelSelected} from 'selectors/views/channel_sidebar';
import {GlobalState} from 'types/store';
import {
    GenericTaskSteps,
    OnboardingTaskCategory,
    OnboardingTasksName,
} from 'components/onboarding_tasks';
import {FINISHED, OnboardingTourSteps, TutorialTourName} from 'components/onboarding_tour';
import {isOnboardingHidden, showNextSteps} from 'components/next_steps_view/steps';

import SidebarChannelLink from './sidebar_channel_link';

type OwnProps = {
    channel: Channel;
}

function makeMapStateToProps() {
    const getUnreadCount = makeGetChannelUnreadCount();

    return (state: GlobalState, ownProps: OwnProps) => {
        const member = getMyChannelMemberships(state)[ownProps.channel.id];
        const unreadCount = getUnreadCount(state, ownProps.channel.id);
        const firstChannelName = getFirstChannelName(state);
        const config = getConfig(state);
        const enableTutorial = config.EnableTutorial === 'true';
        const currentUserId = getCurrentUserId(state);
        const tutorialStep = getInt(state, TutorialTourName.ONBOARDING_TUTORIAL_STEP, currentUserId, 0);
        const triggerStep = getInt(state, OnboardingTaskCategory, OnboardingTasksName.CHANNELS_TOUR, FINISHED);
        const channelTourTriggered = triggerStep === GenericTaskSteps.STARTED;
        const nextStep = showNextSteps(state);
        const onboardingHidden = isOnboardingHidden(state);
        const isOnboardingFlowEnabled = config.EnableOnboardingFlow;
        const isUserFirstAdmin = isFirstAdmin(state);
        const showChannelsTour = enableTutorial && tutorialStep === OnboardingTourSteps.CHANNELS_AND_DIRECT_MESSAGES;
        const showChannelsTutorialStep = showChannelsTour && ((channelTourTriggered && isUserFirstAdmin) || (isOnboardingFlowEnabled === 'true' && !(nextStep || onboardingHidden) && !isUserFirstAdmin) || (isOnboardingFlowEnabled !== 'true' && !isUserFirstAdmin));

        return {
            unreadMentions: unreadCount.mentions,
            unreadMsgs: unreadCount.messages,
            isUnread: unreadCount.showUnread,
            isMuted: isChannelMuted(member),
            isChannelSelected: isChannelSelected(state, ownProps.channel.id),
            firstChannelName: showChannelsTutorialStep ? firstChannelName : '',
            showChannelsTutorialStep,
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            unsetEditingPost,
            clearChannelSelection,
            multiSelectChannelTo,
            multiSelectChannelAdd,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(SidebarChannelLink);
