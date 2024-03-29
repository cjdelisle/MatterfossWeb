// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import {createSelector} from 'reselect';

import {Posts} from 'matterfoss-redux/constants';
import {getAllPosts, getPostIdsInChannel} from 'matterfoss-redux/selectors/entities/posts';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {makePreparePostIdsForPostList} from 'matterfoss-redux/utils/post_list';
import {getCurrentChannel, countCurrentChannelUnreadMessages, isManuallyUnread} from 'matterfoss-redux/selectors/entities/channels';
import {isCollapsedThreadsEnabled} from 'matterfoss-redux/selectors/entities/preferences';

import {updateToastStatus} from 'actions/views/channel';

import ToastWrapper from './toast_wrapper.jsx';
export function makeGetRootPosts() {
    return createSelector(
        'makeGetRootPosts',
        getAllPosts,
        getCurrentUserId,
        getCurrentChannel,
        (allPosts, currentUserId, channel) => {
            // Count the number of new posts that haven't been deleted and are root posts
            return Object.values(allPosts).filter((post) => {
                return (
                    post.root_id === '' &&
                    post.channel_id === channel.id &&
                    post.state !== Posts.POST_DELETED
                );
            }).reduce((map, obj) => {
                map[obj.id] = true;
                return map;
            }, {});
        },
    );
}

export function makeCountUnreadsBelow() {
    return createSelector(
        'makeCountUnreadsBelow',
        getAllPosts,
        getCurrentUserId,
        (state, postIds) => postIds,
        (state, postIds, lastViewedBottom) => lastViewedBottom,
        isCollapsedThreadsEnabled,
        (allPosts, currentUserId, postIds, lastViewedBottom, isCollapsed) => {
            if (!postIds) {
                return 0;
            }

            // Count the number of new posts made by other users that haven't been deleted
            return postIds.map((id) => allPosts[id]).filter((post) => {
                return post &&
                    post.user_id !== currentUserId &&
                    post.state !== Posts.POST_DELETED &&
                    post.create_at > lastViewedBottom &&
                    (isCollapsed ? post.root_id === '' : true); // in collapsed threads mode, only count root posts
            }).length;
        },
    );
}

/* This connected component is written mainly for maintaining the unread count to be passed to the toast
   Unread count logic:
   * If channel is at the latest set of posts:
      Unread count is the Number of posts below new message line
   * if channel is not at the latest set of posts:
      1. UnreadCount + any recent messages in the latest chunk.
      2. If channel was marked as unread.
        * Unread count of channel alone.
*/

function makeMapStateToProps() {
    const countUnreadsBelow = makeCountUnreadsBelow();
    const getRootPosts = makeGetRootPosts();
    const preparePostIdsForPostList = makePreparePostIdsForPostList();
    return function mapStateToProps(state, ownProps) {
        let newRecentMessagesCount = 0;
        const channelMarkedAsUnread = isManuallyUnread(state, ownProps.channelId);
        const lastViewedAt = state.views.channel.lastChannelViewTime[ownProps.channelId];
        if (!ownProps.atLatestPost) {
            let postIds = getPostIdsInChannel(state, ownProps.channelId);
            if (postIds) {
                postIds = preparePostIdsForPostList(state, {postIds, lastViewedAt, channelId: ownProps.channelId});
            }
            newRecentMessagesCount = countUnreadsBelow(state, postIds, lastViewedAt);
        }
        return {
            rootPosts: getRootPosts(state),
            lastViewedAt,
            newRecentMessagesCount,
            isCollapsedThreadsEnabled: isCollapsedThreadsEnabled(state),
            unreadCountInChannel: countCurrentChannelUnreadMessages(state),
            channelMarkedAsUnread,
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            updateToastStatus,
        }, dispatch),
    };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToastWrapper));
