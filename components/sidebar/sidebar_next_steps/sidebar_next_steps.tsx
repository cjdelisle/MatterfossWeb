// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';
import {matchPath} from 'react-router-dom';

import {browserHistory} from 'utils/browser_history';

import {PreferenceType} from 'matterfoss-redux/types/preferences';

import {trackEvent} from 'actions/telemetry_actions';

import FormattedMarkdownMessage from 'components/formatted_markdown_message.jsx';
import {StepType} from 'components/next_steps_view/steps';
import {getAnalyticsCategory} from 'components/next_steps_view/step_helpers';
import ProgressBar from 'components/progress_bar';

import {ModalData} from 'types/actions';

import {ModalIdentifiers, RecommendedNextSteps, Preferences} from 'utils/constants';
import {localizeMessage} from 'utils/utils';

import './sidebar_next_steps.scss';
import {GenericTaskSteps, OnboardingTaskCategory, OnboardingTasksName} from 'components/onboarding_tasks';

import RemoveNextStepsModal from './remove_next_steps_modal';

type Props = {
    showNextSteps: boolean;
    currentUserId: string;
    preferences: PreferenceType[];
    steps: StepType[];
    isAdmin: boolean;
    enableOnboardingFlow: boolean;
    teamUrl: string;
    location: {
        pathname: string;
    };
    useCaseOnboarding: boolean;
    isFirstAdmin: boolean;
    actions: {
        savePreferences: (userId: string, preferences: PreferenceType[]) => void;
        openModal: <P>(modalData: ModalData<P>) => void;
        closeModal: (modalId: string) => void;
    };
};

type State = {
    complete: number;
};

export default class SidebarNextSteps extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            complete: 0,
        };
    }

    closeNextSteps = (event: React.SyntheticEvent): void => {
        const {isAdmin} = this.props;
        event.stopPropagation();
        trackEvent(getAnalyticsCategory(isAdmin), 'click_skip_getting_started', {channel_sidebar: true});

        const screenTitle = localizeMessage('sidebar_next_steps.gettingStarted', 'Getting Started');

        this.props.actions.openModal({
            modalId: ModalIdentifiers.REMOVE_NEXT_STEPS_MODAL,
            dialogType: RemoveNextStepsModal,
            dialogProps: {
                screenTitle,
                onConfirm: this.onConfirmModal,
                onCancel: this.onCloseModal,
            },
        });
    }

    showNextSteps = () => {
        trackEvent(getAnalyticsCategory(this.props.isAdmin), 'click_getting_started');
        browserHistory.push(`${this.props.teamUrl}/tips`);
    }

    onCloseModal = () => {
        this.props.actions.closeModal(ModalIdentifiers.REMOVE_NEXT_STEPS_MODAL);
    }

    onConfirmModal = () => {
        this.props.actions.savePreferences(this.props.currentUserId, [
            {
                user_id: this.props.currentUserId,
                category: Preferences.RECOMMENDED_NEXT_STEPS,
                name: RecommendedNextSteps.HIDE,
                value: 'true',
            },
            {
                user_id: this.props.currentUserId,
                category: OnboardingTaskCategory,
                name: OnboardingTasksName.CHANNELS_TOUR,
                value: GenericTaskSteps.STARTED.toString(),
            },
        ]);

        this.onCloseModal();

        browserHistory.goBack();
    }

    render() {
        if (this.props.useCaseOnboarding && this.props.isFirstAdmin) {
            return null;
        }
        if (!this.props.enableOnboardingFlow) {
            return null;
        }

        if (this.props.preferences.length === 0) {
            return null;
        }

        if (this.props.preferences.some((pref) => pref.name === RecommendedNextSteps.HIDE && pref.value === 'true')) {
            return null;
        }

        if (this.props.preferences.some((pref) => pref.name === RecommendedNextSteps.SKIP && pref.value === 'true')) {
            return null;
        }

        if (!this.props.showNextSteps) {
            return null;
        }

        const total = this.props.steps.length;
        const complete = this.props.preferences.filter((pref) => pref.name !== RecommendedNextSteps.HIDE && pref.value === 'true').length;

        const inTipsView = matchPath(this.props.location.pathname, {path: '/:team/tips'}) != null;

        const header = (
            <FormattedMessage
                id='sidebar_next_steps.gettingStarted'
                defaultMessage='Getting Started'
            />
        );

        const middleSection = (
            <FormattedMarkdownMessage
                id='sidebar_next_steps.stepsComplete'
                defaultMessage='{complete} / {total} steps complete'
                values={{
                    complete,
                    total,
                }}
            />
        );

        return (
            <div
                className={classNames('SidebarNextSteps', {
                    active: inTipsView,
                })}
                onClick={this.showNextSteps}
            >
                <div className='SidebarNextSteps__top'>
                    <span>{header}</span>
                    <button
                        className='SidebarNextSteps__close'
                        onClick={this.closeNextSteps}
                    >
                        <i className='icon icon-close'/>
                    </button>
                </div>
                <div className='SidebarNextSteps__middle'>
                    <span>{middleSection}</span>
                </div>
                <div className='SidebarNextSteps__progressBar'>
                    <ProgressBar
                        current={complete}
                        total={total}
                        basePercentage={4}
                    />
                </div>
            </div>
        );
    }
}
