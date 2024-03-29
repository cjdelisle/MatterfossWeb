// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentChannel, getChannelsInCurrentTeam, getChannelsNameMapInCurrentTeam} from 'matterfoss-redux/selectors/entities/channels';
import {haveIChannelPermission, haveICurrentTeamPermission} from 'matterfoss-redux/selectors/entities/roles';
import {getConfig, getLicense, getSubscriptionStats} from 'matterfoss-redux/selectors/entities/general';
import {getProfiles, searchProfiles as reduxSearchProfiles} from 'matterfoss-redux/actions/users';
import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {searchChannels as reduxSearchChannels} from 'matterfoss-redux/actions/channels';
import {regenerateTeamInviteId} from 'matterfoss-redux/actions/teams';
import {Permissions} from 'matterfoss-redux/constants';

import {CloseModalType} from 'actions/views/modals';
import {Constants} from 'utils/constants';
import {isAdmin} from 'matterfoss-redux/utils/user_utils';
import {sendMembersInvites, sendGuestsInvites} from 'actions/invite_actions';
import {makeAsyncComponent} from 'components/async_load';

import {Channel} from 'matterfoss-redux/types/channels';
import {UserProfile} from 'matterfoss-redux/types/users';
import {ActionFunc, GenericAction} from 'matterfoss-redux/types/actions';

import {GlobalState} from 'types/store';

import type {InviteResults} from './result_view';
const InvitationModal = makeAsyncComponent('InvitationModal', React.lazy(() => import('./invitation_modal')));

const searchProfiles = (term: string, options = {}) => {
    if (!term) {
        return getProfiles(0, 20, options);
    }
    return reduxSearchProfiles(term, options);
};

const searchChannels = (teamId: string, term: string) => {
    return reduxSearchChannels(teamId, term);
};

export function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const license = getLicense(state);
    const channels = getChannelsInCurrentTeam(state);
    const channelsByName = getChannelsNameMapInCurrentTeam(state);
    const townSquareDisplayName = channelsByName[Constants.DEFAULT_CHANNEL]?.display_name || Constants.DEFAULT_CHANNEL_UI_NAME;

    const currentTeam = getCurrentTeam(state);
    const currentChannel = getCurrentChannel(state);
    const subscriptionStats = getSubscriptionStats(state);
    const invitableChannels = channels.filter((channel) => {
        if (channel.type === Constants.DM_CHANNEL || channel.type === Constants.GM_CHANNEL) {
            return false;
        }
        if (channel.type === Constants.PRIVATE_CHANNEL) {
            return haveIChannelPermission(state, currentTeam.id, channel.id, Permissions.MANAGE_PRIVATE_CHANNEL_MEMBERS);
        }
        return haveIChannelPermission(state, currentTeam.id, channel.id, Permissions.MANAGE_PUBLIC_CHANNEL_MEMBERS);
    });
    const guestAccountsEnabled = config.EnableGuestAccounts === 'true';
    const emailInvitationsEnabled = config.EnableEmailInvitations === 'true';
    const isLicensed = license && license.IsLicensed === 'true';
    const isGroupConstrained = Boolean(currentTeam.group_constrained);
    const canInviteGuests = !isGroupConstrained && isLicensed && guestAccountsEnabled && haveICurrentTeamPermission(state, Permissions.INVITE_GUEST);
    const isCloud = license.Cloud === 'true';
    const isFreeTierWithNoFreeSeats = isCloud && subscriptionStats?.is_paid_tier === 'false' && subscriptionStats?.remaining_seats <= 0;

    const canAddUsers = haveICurrentTeamPermission(state, Permissions.ADD_USER_TO_TEAM);

    return {
        invitableChannels,
        currentTeam,
        canInviteGuests,
        canAddUsers,
        isFreeTierWithNoFreeSeats,
        emailInvitationsEnabled,
        isCloud,
        isAdmin: isAdmin(getCurrentUser(state).roles),
        cloudUserLimit: config.ExperimentalCloudUserLimit || '10',
        currentChannel,
        subscriptionStats,
        townSquareDisplayName,
    };
}

type Actions = {
    sendGuestsInvites: (teamId: string, channels: Channel[], users: UserProfile[], emails: string[], message: string) => Promise<{data: InviteResults}>;
    sendMembersInvites: (teamId: string, users: UserProfile[], emails: string[]) => Promise<{data: InviteResults}>;
    regenerateTeamInviteId: (teamId: string) => void;
    searchProfiles: (term: string, options?: Record<string, string>) => Promise<{data: UserProfile[]}>;
    searchChannels: (teamId: string, term: string) => ActionFunc;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | CloseModalType>, Actions>({
            sendGuestsInvites,
            sendMembersInvites,
            regenerateTeamInviteId,
            searchProfiles,
            searchChannels,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationModal);
