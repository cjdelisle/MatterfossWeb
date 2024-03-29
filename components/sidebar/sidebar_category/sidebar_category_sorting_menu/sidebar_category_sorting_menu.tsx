// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {injectIntl, IntlShape} from 'react-intl';

import {Preferences} from 'matterfoss-redux/constants';
import {ChannelCategory, CategorySorting} from 'matterfoss-redux/types/channel_categories';
import {PreferenceType} from 'matterfoss-redux/types/preferences';

import Constants from 'utils/constants';

import {trackEvent} from 'actions/telemetry_actions';

import SidebarMenu from 'components/sidebar/sidebar_menu';
import Menu from 'components/widgets/menu/menu';
import {Menu as SubMenu} from 'types/store/plugins';

type Props = {
    category: ChannelCategory;
    handleOpenDirectMessagesModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    intl: IntlShape;
    isCollapsed: boolean;
    isMenuOpen: boolean;
    onToggleMenu: (isMenuOpen: boolean) => void;
    currentUserId: string;
    selectedDmNumber: number;
    actions: {
        setCategorySorting: (categoryId: string, sorting: CategorySorting) => void;
        savePreferences: (userId: string, preferences: PreferenceType[]) => void;
    };
};

type State = {
    openUp: boolean;
};

export class SidebarCategorySortingMenu extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            openUp: false,
        };
    }

    handleSortDirectMessages = (sorting: CategorySorting) => {
        const {category} = this.props;

        this.props.actions.setCategorySorting(category.id, sorting);
        trackEvent('ui', `ui_sidebar_sort_dm_${sorting}`);
    }

    handlelimitVisibleDMsGMs = (number: number) => {
        const {currentUserId} = this.props;
        this.props.actions.savePreferences(currentUserId, [{
            user_id: currentUserId,
            category: Constants.Preferences.CATEGORY_SIDEBAR_SETTINGS,
            name: Preferences.LIMIT_VISIBLE_DMS_GMS,
            value: number.toString(),
        }]);
    }

    renderDropdownItems = () => {
        const {intl, category} = this.props;

        const sortMenuItems: SubMenu[] = [{
            id: 'sortAlphabetical',
            direction: 'right',
            text: intl.formatMessage({id: 'user.settings.sidebar.sortAlpha', defaultMessage: 'Alphabetically'}),
            action: () => this.handleSortDirectMessages(CategorySorting.Alphabetical),
        },
        {
            id: 'sortByMostRecent',
            direction: 'right',
            text: intl.formatMessage({id: 'sidebar.sortedByRecencyLabel', defaultMessage: 'Recent Activity'}),
            action: () => this.handleSortDirectMessages(CategorySorting.Recency),
        }];

        const dmLimitOptions = [10, 15, 20, 40];

        const selectedDmCount = dmLimitOptions.map((number): SubMenu => {
            return {
                id: `SidebarCategorySortingMenu-dmCount-${number}`,
                direction: 'right',
                text: `${number}`,
                action: () => this.handlelimitVisibleDMsGMs(number),
            };
        });

        const categoryMenuItems: SubMenu[] = [];
        categoryMenuItems.push(
            {
                id: 'showAllDms',
                direction: 'right',
                text: intl.formatMessage({id: 'sidebar.allDirectMessages', defaultMessage: 'All direct messages'}),
                action: () => this.handlelimitVisibleDMsGMs(10000),
            },
            {
                id: 'ChannelMenu-moveToDivider',
                text: (<li className='MenuGroup menu-divider'/>),
            },
            ...selectedDmCount,
        );

        const browseDirectMessages = (
            <Menu.Group>
                <Menu.ItemAction
                    id={'browseDirectMessages'}
                    onClick={this.props.handleOpenDirectMessagesModal}
                    icon={<i className='icon-account-plus-outline'/>}
                    text={intl.formatMessage({id: 'sidebar.openDirectMessage', defaultMessage: 'Open a direct message'})}
                />
            </Menu.Group>
        );

        return (
            <React.Fragment>
                <Menu.Group>
                    <Menu.ItemSubMenu
                        id={'sortDirectMessages'}
                        subMenu={sortMenuItems}
                        text={intl.formatMessage({id: 'sidebar.sort', defaultMessage: 'Sort'})}
                        selectedValueText={category.sorting === CategorySorting.Alphabetical ? intl.formatMessage({id: 'user.settings.sidebar.sortAlpha', defaultMessage: 'Alphabetically'}) : intl.formatMessage({id: 'user.settings.sidebar.recent', defaultMessage: 'Recent Activity'})}
                        icon={category.sorting === CategorySorting.Alphabetical ? <i className='icon-sort-alphabetical-ascending'/> : <i className='icon-clock-outline'/>}
                        direction={'right'}
                        openUp={this.state.openUp}
                        styleSelectableItem={true}
                    />
                    <Menu.ItemSubMenu
                        id={'showMessageCount'}
                        subMenu={categoryMenuItems}
                        text={intl.formatMessage({id: 'sidebar.show', defaultMessage: 'Show'})}
                        selectedValueText={this.props.selectedDmNumber === 10000 ? intl.formatMessage({id: 'channel_notifications.levels.all', defaultMessage: 'All'}) : this.props.selectedDmNumber}
                        icon={<i className='icon-account-multiple-outline'/>}
                        direction={'right'}
                        openUp={this.state.openUp}
                        styleSelectableItem={true}
                    />
                </Menu.Group>
                {browseDirectMessages}
            </React.Fragment>
        );
    }

    handleOpenDirectionChange = (openUp: boolean) => {
        this.setState({
            openUp,
        });
    }

    onToggleMenu = (open: boolean) => {
        this.props.onToggleMenu(open);

        if (open) {
            trackEvent('ui', 'ui_sidebar_category_menu_opened');
        }
    }

    render() {
        const {
            intl,
            isCollapsed,
            isMenuOpen,
        } = this.props;

        return (
            <SidebarMenu
                id={'SidebarCategorySortingMenu'}
                ariaLabel={intl.formatMessage({id: 'sidebar_left.sidebar_category_menu.dropdownAriaLabel', defaultMessage: 'Category Menu'})}
                buttonAriaLabel={intl.formatMessage({id: 'sidebar_left.sidebar_category_menu.dropdownAriaLabel', defaultMessage: 'Category Menu'})}
                isMenuOpen={isMenuOpen}
                onToggleMenu={this.onToggleMenu}
                onOpenDirectionChange={this.handleOpenDirectionChange}
                tooltipText={intl.formatMessage({id: 'sidebar_left.sidebar_category_menu.editCategory', defaultMessage: 'Category options'})}
                tabIndex={isCollapsed ? -1 : 0}
                additionalClass='additionalClass'
            >
                {this.renderDropdownItems()}
            </SidebarMenu>
        );
    }
}

export default injectIntl(SidebarCategorySortingMenu);
