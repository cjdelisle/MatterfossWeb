// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage, injectIntl, WrappedComponentProps} from 'react-intl';
import classNames from 'classnames';

import {trackEvent} from 'actions/telemetry_actions';

import {ModalIdentifiers} from 'utils/constants';

import MenuWrapper from 'components/widgets/menu/menu_wrapper';
import UserGuideIcon from 'components/widgets/icons/user_guide_icon';
import Menu from 'components/widgets/menu/menu';
import OverlayTrigger from 'components/overlay_trigger';
import Tooltip from 'components/tooltip';
import KeyboardShortcutsModal from 'components/keyboard_shortcuts/keyboard_shortcuts_modal/keyboard_shortcuts_modal';

import type {PropsFromRedux} from './index';

const askTheCommunityUrl = 'https://matterfoss.com/pl/default-ask-matterfoss-community/';

type Props = PropsFromRedux & WrappedComponentProps

type State = {
    buttonActive: boolean;
};

class UserGuideDropdown extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            buttonActive: false,
        };
    }

    openKeyboardShortcutsModal = (e: MouseEvent) => {
        e.preventDefault();
        this.props.actions.openModal({
            modalId: ModalIdentifiers.KEYBOARD_SHORTCUTS_MODAL,
            dialogType: KeyboardShortcutsModal,
        });
    }

    buttonToggleState = (menuActive: boolean) => {
        this.setState({
            buttonActive: menuActive,
        });
    }

    askTheCommunityClick = () => {
        trackEvent('ui', 'help_ask_the_community');
    }

    renderDropdownItems = (): React.ReactNode => {
        const {intl} = this.props;

        return (
            <Menu.Group>
                {this.props.enableAskCommunityLink === 'true' && (
                    <Menu.ItemExternalLink
                        id='askTheCommunityLink'
                        url={askTheCommunityUrl}
                        text={intl.formatMessage({id: 'userGuideHelp.askTheCommunity', defaultMessage: 'Ask the community'})}
                        onClick={this.askTheCommunityClick}
                    />
                )}
                <Menu.ItemExternalLink
                    id='helpResourcesLink'
                    url={this.props.helpLink}
                    text={intl.formatMessage({id: 'userGuideHelp.helpResources', defaultMessage: 'Help resources'})}
                />
                <Menu.ItemExternalLink
                    id='reportAProblemLink'
                    url={this.props.reportAProblemLink}
                    text={intl.formatMessage({id: 'userGuideHelp.reportAProblem', defaultMessage: 'Report a problem'})}
                />
                <Menu.ItemAction
                    id='keyboardShortcuts'
                    onClick={this.openKeyboardShortcutsModal}
                    text={intl.formatMessage({id: 'userGuideHelp.keyboardShortcuts', defaultMessage: 'Keyboard shortcuts'})}
                />
            </Menu.Group>
        );
    }

    render() {
        const {intl} = this.props;
        const tooltip = (
            <Tooltip
                id='userGuideHelpTooltip'
                className='hidden-xs'
            >
                <FormattedMessage
                    id={'channel_header.userHelpGuide'}
                    defaultMessage='Help'
                />
            </Tooltip>
        );

        return (
            <MenuWrapper
                className='userGuideHelp'
                onToggle={this.buttonToggleState}
            >
                <OverlayTrigger
                    delayShow={500}
                    placement='bottom'
                    overlay={this.state.buttonActive ? <></> : tooltip}
                >
                    <button
                        id='channelHeaderUserGuideButton'
                        className={classNames('channel-header__icon', {'channel-header__icon--active': this.state.buttonActive})}
                        type='button'
                        aria-expanded='true'
                    >
                        <UserGuideIcon className='icon'/>
                    </button>
                </OverlayTrigger>
                <Menu
                    openLeft={true}
                    openUp={false}
                    id='AddChannelDropdown'
                    ariaLabel={intl.formatMessage({id: 'sidebar_left.add_channel_dropdown.dropdownAriaLabel', defaultMessage: 'Add Channel Dropdown'})}
                >
                    {this.renderDropdownItems()}
                </Menu>
            </MenuWrapper>
        );
    }
}

export default injectIntl(UserGuideDropdown);
