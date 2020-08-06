// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addChannelMember} from 'matterfoss-redux/actions/channels';
import {removePost} from 'matterfoss-redux/actions/posts';
import {getPost} from 'matterfoss-redux/selectors/entities/posts';
import {getChannel} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';

import PostAddChannelMember from './post_add_channel_member.jsx';

function mapStateToProps(state, ownProps) {
    const post = getPost(state, ownProps.postId) || {};
    let channelType = '';
    if (post && post.channel_id) {
        const channel = getChannel(state, post.channel_id);
        if (channel && channel.type) {
            channelType = channel.type;
        }
    }

    return {
        channelType,
        currentUser: getCurrentUser(state),
        post,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            addChannelMember,
            removePost,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAddChannelMember);
