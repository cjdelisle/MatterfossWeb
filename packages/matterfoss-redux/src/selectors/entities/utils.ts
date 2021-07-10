// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {getMyChannelMemberships, getAllChannels} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';

import {GlobalState} from 'matterfoss-redux/types/store';
import {Channel} from 'matterfoss-redux/types/channels';
import {UserProfile, UserProfileWithLastViewAt} from 'matterfoss-redux/types/users';
import {getDirectChannelName} from 'matterfoss-redux/utils/channel_utils';
import {General} from 'matterfoss-redux/constants';

import {NameMappedObjects} from 'matterfoss-redux/types/utilities';

export function makeAddLastViewAtToProfiles(): (state: GlobalState, profiles: UserProfile[]) => UserProfileWithLastViewAt[] {
    return createSelector(
        getCurrentUserId,
        getMyChannelMemberships,
        getAllChannels,
        (state: GlobalState, profiles: UserProfile[]) => profiles,
        (currentUserId, memberships, allChannels, profiles) => {
            const DMchannels = Object.values(allChannels).reduce((acc: NameMappedObjects<Channel>, channel) => {
                if (channel.type === General.DM_CHANNEL) {
                    return {
                        ...acc,
                        [channel.name]: channel,
                    };
                }
                return acc;
            }, {});

            const formattedProfiles: UserProfileWithLastViewAt[] = profiles.map((profile) => {
                const channelName = getDirectChannelName(currentUserId, profile.id);
                const channel = DMchannels[channelName];
                const membership = channel ? memberships[channel.id] : null;
                return {
                    ...profile,
                    last_viewed_at: channel && membership ? membership.last_viewed_at : 0,
                };
            });
            return formattedProfiles;
        },
    );
}
