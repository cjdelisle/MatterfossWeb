// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {makeGetPostsForThread, getPost} from 'matterfoss-redux/selectors/entities/posts';
import {getChannel} from 'matterfoss-redux/selectors/entities/channels';
import {getThread} from 'matterfoss-redux/selectors/entities/threads';
import {get, getBool, isCollapsedThreadsEnabled} from 'matterfoss-redux/selectors/entities/preferences';
import {removePost, getPostThread} from 'matterfoss-redux/actions/posts';
import {getThread as fetchThread, updateThreadRead} from 'matterfoss-redux/actions/threads';
import {GenericAction} from 'matterfoss-redux/types/actions';
import {Post} from 'matterfoss-redux/types/posts';
import {UserProfile} from 'matterfoss-redux/types/users';
import {UserThread} from 'matterfoss-redux/types/threads';

import {Preferences} from 'utils/constants';
import {getDirectTeammate} from 'utils/utils.jsx';
import {getSocketStatus} from 'selectors/views/websocket';
import {selectPostCard} from 'actions/views/rhs';
import {GlobalState} from 'types/store';

import ThreadViewer from './thread_viewer';

type OwnProps = {
    rootPostId: string;
};

function makeMapStateToProps() {
    const getPostsForThread = makeGetPostsForThread();
    return function mapStateToProps(state: GlobalState, {rootPostId}: OwnProps) {
        const currentUserId = getCurrentUserId(state);
        const currentTeamId = getCurrentTeamId(state);
        const selected = getPost(state, rootPostId);
        const channel = getChannel(state, selected?.channel_id);
        const socketStatus = getSocketStatus(state);

        let posts: Post[] = [];
        let userThread: UserThread | null = null;
        if (selected) {
            posts = getPostsForThread(state, {rootId: selected.id});
            userThread = getThread(state, selected.id);
        }

        const previewCollapsed = get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.COLLAPSE_DISPLAY, Preferences.COLLAPSE_DISPLAY_DEFAULT);

        return {
            isCollapsedThreadsEnabled: isCollapsedThreadsEnabled(state),
            currentUserId,
            currentTeamId,
            userThread,
            selected,
            channel,
            posts,
            socketConnectionStatus: socketStatus.connected,
            previewCollapsed,
            previewEnabled: getBool(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.LINK_PREVIEW_DISPLAY, Preferences.LINK_PREVIEW_DISPLAY_DEFAULT === 'true'),
            directTeammate: getDirectTeammate(state, channel?.id) as UserProfile,
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            removePost,
            getPostThread,
            selectPostCard,
            getThread: fetchThread,
            updateThreadRead,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ThreadViewer);
