// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getPost} from 'matterfoss-redux/selectors/entities/posts';
import {isCurrentChannelReadOnly, getCurrentChannel} from 'matterfoss-redux/selectors/entities/channels';
import {getUser} from 'matterfoss-redux/selectors/entities/users';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';

import PostBody from './post_body.jsx';

function mapStateToProps(state, ownProps) {
    let parentPost;
    let parentPostUser;
    if (ownProps.post.root_id) {
        parentPost = getPost(state, ownProps.post.root_id);
        parentPostUser = parentPost ? getUser(state, parentPost.user_id) : null;
    }

    const config = getConfig(state);
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';

    const currentChannel = getCurrentChannel(state) || {};
    const channelIsArchived = currentChannel.delete_at !== 0;

    return {
        parentPost,
        parentPostUser,
        pluginPostTypes: state.plugins.postTypes,
        enablePostUsernameOverride,
        isReadOnly: isCurrentChannelReadOnly(state) || channelIsArchived,
    };
}

export default connect(mapStateToProps)(PostBody);
