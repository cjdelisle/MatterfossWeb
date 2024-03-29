// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {memo} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import {getPost, makeGetPostsForThread} from 'matterfoss-redux/selectors/entities/posts';
import {makeGetChannel} from 'matterfoss-redux/selectors/entities/channels';
import {makeGetDisplayName} from 'matterfoss-redux/selectors/entities/users';
import {getThread} from 'matterfoss-redux/selectors/entities/threads';
import {getCurrentRelativeTeamUrl} from 'matterfoss-redux/selectors/entities/teams';

import {GlobalState} from 'types/store';

import ThreadItem, {OwnProps} from './thread_item';

function makeMapStateToProps() {
    const getPostsForThread = makeGetPostsForThread();
    const getChannel = makeGetChannel();
    const getDisplayName = makeGetDisplayName();

    return (state: GlobalState, ownProps: OwnProps) => {
        const {threadId} = ownProps;

        const post = getPost(state, threadId);

        return {
            post,
            channel: getChannel(state, {id: post.channel_id}),
            currentRelativeTeamUrl: getCurrentRelativeTeamUrl(state),
            displayName: getDisplayName(state, post.user_id, true),
            postsInThread: getPostsForThread(state, post.id),
            thread: getThread(state, threadId),
        };
    };
}

export default compose(
    connect(makeMapStateToProps),
    memo,
)(ThreadItem) as React.FunctionComponent<OwnProps>;
