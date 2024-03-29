// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {Dispatch, bindActionCreators, ActionCreatorsMapObject} from 'redux';

import {favoriteChannel, unfavoriteChannel, markChannelAsRead} from 'matterfoss-redux/actions/channels';
import Permissions from 'matterfoss-redux/constants/permissions';
import {isFavoriteChannel} from 'matterfoss-redux/selectors/entities/channels';
import {getMyChannelMemberships, getCurrentUserId} from 'matterfoss-redux/selectors/entities/common';
import {getCategoryInTeamWithChannel} from 'matterfoss-redux/selectors/entities/channel_categories';
import {haveIChannelPermission} from 'matterfoss-redux/selectors/entities/roles';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {Action} from 'matterfoss-redux/types/actions';
import {Channel} from 'matterfoss-redux/types/channels';
import {isChannelMuted} from 'matterfoss-redux/utils/channel_utils';

import {unmuteChannel, muteChannel} from 'actions/channel_actions';
import {addChannelsInSidebar} from 'actions/views/channel_sidebar';
import {openModal} from 'actions/views/modals';

import {getCategoriesForCurrentTeam, getDisplayedChannels} from 'selectors/views/channel_sidebar';

import {ModalData} from 'types/actions';
import {GlobalState} from 'types/store';

import {getSiteURL} from 'utils/url';

import SidebarChannelMenu from './sidebar_channel_menu';

type OwnProps = {
    channel: Channel;
    channelLink: string;
    isUnread: boolean;
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const member = getMyChannelMemberships(state)[ownProps.channel.id];
    const currentTeam = getCurrentTeam(state);

    let managePublicChannelMembers = false;
    let managePrivateChannelMembers = false;
    let categories;
    let currentCategory;

    if (currentTeam) {
        managePublicChannelMembers = haveIChannelPermission(state, currentTeam.id, ownProps.channel.id, Permissions.MANAGE_PUBLIC_CHANNEL_MEMBERS);
        managePrivateChannelMembers = haveIChannelPermission(state, currentTeam.id, ownProps.channel.id, Permissions.MANAGE_PRIVATE_CHANNEL_MEMBERS);
        categories = getCategoriesForCurrentTeam(state);
        currentCategory = getCategoryInTeamWithChannel(state, currentTeam.id, ownProps.channel.id);
    }

    return {
        currentTeamId: currentTeam.id,
        currentUserId: getCurrentUserId(state),
        categories,
        currentCategory,
        isFavorite: isFavoriteChannel(state, ownProps.channel.id),
        isMuted: isChannelMuted(member),
        channelLink: `${getSiteURL()}${ownProps.channelLink}`,
        managePublicChannelMembers,
        managePrivateChannelMembers,
        displayedChannels: getDisplayedChannels(state),
        multiSelectedChannelIds: state.views.channelSidebar.multiSelectedChannelIds,
    };
}

type Actions = {
    markChannelAsRead: (channelId: string) => void;
    favoriteChannel: (channelId: string) => void;
    unfavoriteChannel: (channelId: string) => void;
    muteChannel: (userId: string, channelId: string) => void;
    unmuteChannel: (userId: string, channelId: string) => void;
    openModal: <P>(modalData: ModalData<P>) => void;
    addChannelsInSidebar: (categoryId: string, channelId: string) => void;
};

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            markChannelAsRead,
            favoriteChannel,
            unfavoriteChannel,
            muteChannel,
            unmuteChannel,
            openModal,
            addChannelsInSidebar,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarChannelMenu);
