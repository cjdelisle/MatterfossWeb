// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {getChannel} from 'matterfoss-redux/selectors/entities/channels';
import {makeGetPostsForThread} from 'matterfoss-redux/selectors/entities/posts';
import {get, getBool} from 'matterfoss-redux/selectors/entities/preferences';
import {removePost, getPostThread} from 'matterfoss-redux/actions/posts';
import {GenericAction} from 'matterfoss-redux/types/actions';
import {Post} from 'matterfoss-redux/types/posts';
import {UserProfile} from 'matterfoss-redux/src/types/users';

import {Preferences} from 'utils/constants';
import {getDirectTeammate} from 'utils/utils.jsx';
import {getSelectedPost} from 'selectors/rhs';
import {getSocketStatus} from 'selectors/views/websocket';
import {selectPostCard} from 'actions/views/rhs';
import {GlobalState} from 'types/store';

import RhsThread from './rhs_thread';

function makeMapStateToProps() {
    const getPostsForThread = makeGetPostsForThread();

    return function mapStateToProps(state: GlobalState) {
        const selected = getSelectedPost(state);
        const socketStatus = getSocketStatus(state);

        let channel = null;
        let posts: Post[] = [];
        if (selected) {
            posts = getPostsForThread(state, {rootId: selected.id});
            channel = getChannel(state, selected.channel_id);
        }

        const previewCollapsed = get(state, Preferences.CATEGORY_DISPLAY_SETTINGS, Preferences.COLLAPSE_DISPLAY, Preferences.COLLAPSE_DISPLAY_DEFAULT);

        return {
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
            selectPostCard,
            getPostThread,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(RhsThread);
