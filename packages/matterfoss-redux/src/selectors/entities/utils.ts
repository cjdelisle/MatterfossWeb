// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {getMyChannelMemberships, getAllDmChannels} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentUserId, getUserStatuses} from 'matterfoss-redux/selectors/entities/users';

import {GlobalState} from 'matterfoss-redux/types/store';
import {UserProfile, UserProfileWithLastViewAt} from 'matterfoss-redux/types/users';
import {getDirectChannelName} from 'matterfoss-redux/utils/channel_utils';

export function makeAddLastViewAtToProfiles(): (state: GlobalState, profiles: UserProfile[]) => UserProfileWithLastViewAt[] {
    return createSelector(
        'makeAddLastViewAtToProfiles',
        getCurrentUserId,
        getMyChannelMemberships,
        getAllDmChannels,
        getUserStatuses,
        (_: GlobalState, profiles: UserProfile[]) => profiles,
        (currentUserId, memberships, allDmChannels, userStatuses, profiles) => {
            const formattedProfiles: UserProfileWithLastViewAt[] = profiles.map((profile) => {
                const channelName = getDirectChannelName(currentUserId, profile.id);
                const channel = allDmChannels[channelName];
                const membership = channel ? memberships[channel.id] : null;
                const status = userStatuses[profile.id];

                return {
                    ...profile,
                    status,
                    last_viewed_at: channel && membership ? membership.last_viewed_at : 0,
                };
            });

            return formattedProfiles;
        },
    );
}
