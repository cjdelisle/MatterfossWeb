// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, ActionCreatorsMapObject, Dispatch} from 'redux';
import {
    getProfiles,
    getProfilesInTeam,
    getStatusesByIds,
    getTotalUsersStats,
    searchProfiles,
} from 'matterfoss-redux/actions/users';
import {searchGroupChannels} from 'matterfoss-redux/actions/channels';
import {
    getCurrentUserId,
    getProfiles as selectProfiles,
    getProfilesInCurrentChannel,
    getProfilesInCurrentTeam, searchProfiles as searchProfilesSelector,
    searchProfilesInCurrentTeam,
    getTotalUsersStats as getTotalUsersStatsSelector,
} from 'matterfoss-redux/selectors/entities/users';
import {getChannelsWithUserProfiles, getAllChannels} from 'matterfoss-redux/selectors/entities/channels';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {ActionFunc} from 'matterfoss-redux/types/actions';
import {Channel} from 'matterfoss-redux/types/channels';
import {UserProfile} from 'matterfoss-redux/types/users';
import {sortByUsername, filterProfilesMatchingTerm} from 'matterfoss-redux/utils/user_utils';
import {memoizeResult} from 'matterfoss-redux/utils/helpers';

import {openDirectChannelToUserId, openGroupChannelToUserIds} from 'actions/channel_actions';
import {loadStatusesForProfilesList} from 'actions/status_actions.jsx';
import {loadProfilesForGroupChannels} from 'actions/user_actions.jsx';
import {setModalSearchTerm} from 'actions/views/search';

import {GlobalState} from 'types/store';

import MoreDirectChannels from './more_direct_channels';

type OwnProps = {
    isExistingChannel: boolean;
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const currentUserId = getCurrentUserId(state);
    let currentChannelMembers: UserProfile[] = [];
    if (ownProps.isExistingChannel) {
        currentChannelMembers = getProfilesInCurrentChannel(state);
    }

    const config = getConfig(state);
    const restrictDirectMessage = config.RestrictDirectMessage;

    const searchTerm = state.views.search.modalSearch;

    let users;
    if (searchTerm) {
        if (restrictDirectMessage === 'any') {
            users = searchProfilesSelector(state, searchTerm, false);
        } else {
            users = searchProfilesInCurrentTeam(state, searchTerm, false);
        }
    } else if (restrictDirectMessage === 'any') {
        users = selectProfiles(state, {});
    } else {
        users = getProfilesInCurrentTeam(state);
    }

    const filteredGroupChannels = filterGroupChannels(getChannelsWithUserProfiles(state), searchTerm);
    const myDirectChannels = filterDirectChannels(getAllChannels(state), currentUserId);

    const team = getCurrentTeam(state);
    const stats = getTotalUsersStatsSelector(state) || {total_users_count: 0};

    return {
        currentTeamId: team.id,
        currentTeamName: team.name,
        searchTerm,
        users: users.sort(sortByUsername),
        myDirectChannels,
        groupChannels: filteredGroupChannels,
        statuses: state.entities.users.statuses,
        currentChannelMembers,
        currentUserId,
        restrictDirectMessage,
        totalCount: stats.total_users_count,
    };
}

const filterGroupChannels = memoizeResult((channels: Array<{profiles: Array<UserProfile>} & Channel>, term: string) => {
    return channels.filter((channel) => {
        const matches = filterProfilesMatchingTerm(channel.profiles, term);
        return matches.length > 0;
    });
});

const filterDirectChannels = memoizeResult((channels: Channel[], userId: string) => {
    return Object.values(channels).filter((channel) => {
        if (channel.type !== 'D') {
            return false;
        }
        if (channel.name && channel.name.indexOf(userId) < 0) {
            return false;
        }
        return true;
    });
});

type Actions = {
    getProfiles: (page?: number | undefined, perPage?: number | undefined, options?: any) => Promise<any>;
    getProfilesInTeam: (teamId: string, page: number, perPage?: number | undefined, sort?: string | undefined, options?: any) => Promise<any>;
    getStatusesByIds: (userIds: string[]) => ActionFunc;
    getTotalUsersStats: () => ActionFunc;
    loadStatusesForProfilesList: (users: any) => {
        data: boolean;
    };
    loadProfilesForGroupChannels: (groupChannels: any) => Promise<any>;
    openDirectChannelToUserId: (userId: any) => Promise<any>;
    openGroupChannelToUserIds: (userIds: any) => Promise<any>;
    searchProfiles: (term: string, options?: any) => Promise<any>;
    searchGroupChannels: (term: string) => Promise<any>;
    setModalSearchTerm: (term: any) => Promise<{
        data: boolean;
    }>;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getProfiles,
            getProfilesInTeam,
            getStatusesByIds,
            getTotalUsersStats,
            loadStatusesForProfilesList,
            loadProfilesForGroupChannels,
            openDirectChannelToUserId,
            openGroupChannelToUserIds,
            searchProfiles,
            searchGroupChannels,
            setModalSearchTerm,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreDirectChannels);
