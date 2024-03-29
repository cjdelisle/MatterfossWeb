// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {
    getAllChannels,
    getCurrentChannelId,
    getMyChannelMemberships,
    getUnreadChannelIds,
} from 'matterfoss-redux/selectors/entities/channels';
import {
    makeGetCategoriesForTeam,
    makeGetChannelsByCategory,
    makeGetChannelIdsForCategory,
} from 'matterfoss-redux/selectors/entities/channel_categories';
import {getLastPostPerChannel} from 'matterfoss-redux/selectors/entities/posts';
import {shouldShowUnreadsCategory, isCollapsedThreadsEnabled} from 'matterfoss-redux/selectors/entities/preferences';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {Channel} from 'matterfoss-redux/types/channels';
import {CategorySorting, ChannelCategory} from 'matterfoss-redux/types/channel_categories';
import {RelationOneToOne} from 'matterfoss-redux/types/utilities';
import {isChannelMuted} from 'matterfoss-redux/utils/channel_utils';
import {memoizeResult} from 'matterfoss-redux/utils/helpers';

import {DraggingState, GlobalState} from 'types/store';

export function isUnreadFilterEnabled(state: GlobalState): boolean {
    return state.views.channelSidebar.unreadFilterEnabled && !shouldShowUnreadsCategory(state);
}

export const getCategoriesForCurrentTeam: (state: GlobalState) => ChannelCategory[] = (() => {
    const getCategoriesForTeam = makeGetCategoriesForTeam();

    return memoizeResult((state: GlobalState) => {
        const currentTeamId = getCurrentTeamId(state);
        return getCategoriesForTeam(state, currentTeamId);
    });
})();

export const getAutoSortedCategoryIds: (state: GlobalState) => Set<string> = (() => createSelector(
    'getAutoSortedCategoryIds',
    (state: GlobalState) => getCategoriesForCurrentTeam(state),
    (categories) => {
        return new Set(categories.filter((category) =>
            category.sorting === CategorySorting.Alphabetical ||
            category.sorting === CategorySorting.Recency).map((category) => category.id));
    },
))();

export const getChannelsByCategoryForCurrentTeam: (state: GlobalState) => RelationOneToOne<ChannelCategory, Channel[]> = (() => {
    const getChannelsByCategory = makeGetChannelsByCategory();

    return memoizeResult((state: GlobalState) => {
        const currentTeamId = getCurrentTeamId(state);
        return getChannelsByCategory(state, currentTeamId);
    });
})();

const getUnreadChannelIdsSet = createSelector(
    'getUnreadChannelIdsSet',
    (state: GlobalState) => getUnreadChannelIds(state, state.views.channel.lastUnreadChannel),
    (unreadChannelIds) => {
        return new Set(unreadChannelIds);
    },
);

// getChannelsInCategoryOrder returns an array of channels on the current team that are currently visible in the sidebar.
// Channels are returned in the same order as in the sidebar. Channels in the Unreads category are not included.
export const getChannelsInCategoryOrder = (() => {
    return createSelector(
        'getChannelsInCategoryOrder',
        getCategoriesForCurrentTeam,
        getChannelsByCategoryForCurrentTeam,
        getCurrentChannelId,
        getUnreadChannelIdsSet,
        shouldShowUnreadsCategory,
        (categories, channelsByCategory, currentChannelId, unreadChannelIds, showUnreadsCategory) => {
            return categories.map((category) => {
                const channels = channelsByCategory[category.id];

                return channels.filter((channel: Channel) => {
                    const isUnread = unreadChannelIds.has(channel.id);

                    if (showUnreadsCategory) {
                        // Filter out channels that have been moved to the Unreads category
                        if (isUnread) {
                            return false;
                        }
                    }

                    if (category.collapsed) {
                        // Filter out channels that would be hidden by a collapsed category
                        if (!isUnread && currentChannelId !== channel.id) {
                            return false;
                        }
                    }

                    return true;
                });
            }).flat();
        },
    );
})();

// getUnreadChannels returns an array of all unread channels on the current team for display with the unread filter
// enabled. Channels are sorted by recency with channels containing a mention grouped first.
export const getUnreadChannels = (() => {
    const getUnsortedUnreadChannels = createSelector(
        'getUnreadChannels',
        getAllChannels,
        getUnreadChannelIdsSet,
        getCurrentChannelId,
        isUnreadFilterEnabled,
        (allChannels, unreadChannelIds, currentChannelId, unreadFilterEnabled) => {
            const unreadChannels = [];
            for (const channelId of unreadChannelIds) {
                const channel = allChannels[channelId];

                // Only include an archived channel if it's the current channel
                if (channel.delete_at > 0 && channel.id !== currentChannelId) {
                    continue;
                }

                unreadChannels.push(channel);
            }

            // This selector is used for both the unread filter and the unreads category which treat the current
            // channel differently
            if (unreadFilterEnabled) {
                // The current channel is already in unreadChannels if it was previously unread but we need to add it
                // if it wasn't previously unread
                if (currentChannelId && unreadChannels.findIndex((channel) => channel.id === currentChannelId) === -1) {
                    unreadChannels.push(allChannels[currentChannelId]);
                }
            }

            return unreadChannels;
        },
    );

    const sortChannels = createSelector(
        'sortChannels',
        (state: GlobalState, channels: Channel[]) => channels,
        getMyChannelMemberships,
        getLastPostPerChannel,
        (state: GlobalState) => state.views.channel.lastUnreadChannel,
        isCollapsedThreadsEnabled,
        (channels, myMembers, lastPosts, lastUnreadChannel, crtEnabled) => {
            function isMuted(channel: Channel) {
                return isChannelMuted(myMembers[channel.id]);
            }

            function hasMentions(channel: Channel) {
                if (lastUnreadChannel && channel.id === lastUnreadChannel.id && lastUnreadChannel.hadMentions) {
                    return true;
                }

                const member = myMembers[channel.id];
                return member?.mention_count !== 0;
            }

            // Sort channels with mentions first and then sort by recency
            return [...channels].sort((a, b) => {
                // Sort muted channels last
                if (isMuted(a) && !isMuted(b)) {
                    return 1;
                } else if (!isMuted(a) && isMuted(b)) {
                    return -1;
                }

                // Sort non-muted mentions first
                if (hasMentions(a) && !hasMentions(b)) {
                    return -1;
                } else if (!hasMentions(a) && hasMentions(b)) {
                    return 1;
                }

                let lastPostAt = {
                    a: a.last_post_at,
                    b: b.last_post_at,
                };

                if (crtEnabled) {
                    lastPostAt = {
                        a: a.last_root_post_at,
                        b: b.last_root_post_at,
                    };
                }

                // If available, get the last post time from the loaded posts for the channel, but fall back to the
                // channel's last_post_at if that's not available. The last post time from the loaded posts is more
                // accurate because channel.last_post_at is not updated on the client as new messages come in.
                const aLastPostAt = maxDefined(lastPostAt.a, lastPosts[a.id]?.create_at);
                const bLastPostAt = maxDefined(lastPostAt.b, lastPosts[b.id]?.create_at);

                return bLastPostAt - aLastPostAt;
            });
        },
    );

    return (state: GlobalState) => {
        const channels = getUnsortedUnreadChannels(state);
        return sortChannels(state, channels);
    };
})();

function maxDefined(a: number, b?: number) {
    return typeof b === 'undefined' ? a : Math.max(a, b);
}

// WARNING: below functions are used in getDisplayedChannels only. Do not use it elsewhere.
function concatChannels(channelsA: Channel[], channelsB: Channel[]) {
    return [...channelsA, ...channelsB];
}
const memoizedConcatChannels = memoizeResult(concatChannels);

// Returns an array of channels in the order that they currently appear in the sidebar. Channels are filtered out if they
// are hidden such as by a collapsed category or the unread filter.
export const getDisplayedChannels = createSelector(
    'getDisplayedChannels',
    isUnreadFilterEnabled,
    getUnreadChannels,
    shouldShowUnreadsCategory,
    getChannelsInCategoryOrder,
    (unreadFilterEnabled, unreadChannels, showUnreadsCategory, channelsInCategoryOrder) => {
        if (unreadFilterEnabled) {
            return unreadChannels;
        }

        if (showUnreadsCategory) {
            return memoizedConcatChannels(unreadChannels, channelsInCategoryOrder);
        }

        return channelsInCategoryOrder;
    },
);

// Returns a selector that, given a category, returns the ids of channels visible in that category. The returned channels do not
// include unread channels when the Unreads category is enabled.
export function makeGetFilteredChannelIdsForCategory(): (state: GlobalState, category: ChannelCategory) => string[] {
    const getChannelIdsForCategory = makeGetChannelIdsForCategory();

    return createSelector(
        'makeGetFilteredChannelIdsForCategory',
        getChannelIdsForCategory,
        getUnreadChannelIdsSet,
        shouldShowUnreadsCategory,
        (channelIds, unreadChannelIdsSet, showUnreadsCategory) => {
            if (!showUnreadsCategory) {
                return channelIds;
            }

            const filtered = channelIds.filter((id) => !unreadChannelIdsSet.has(id));

            return filtered.length === channelIds.length ? channelIds : filtered;
        },
    );
}

export function getDraggingState(state: GlobalState): DraggingState {
    return state.views.channelSidebar.draggingState;
}

export function isChannelSelected(state: GlobalState, channelId: string): boolean {
    return state.views.channelSidebar.multiSelectedChannelIds.indexOf(channelId) !== -1;
}
