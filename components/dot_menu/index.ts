// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ComponentProps} from 'react';
import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getLicense, getConfig} from 'matterfoss-redux/selectors/entities/general';
import {getChannel} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {getCurrentTeamId, getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {appsEnabled, makeAppBindingsSelector} from 'matterfoss-redux/selectors/entities/apps';
import {getThreadOrSynthetic} from 'matterfoss-redux/selectors/entities/threads';
import {getPost} from 'matterfoss-redux/selectors/entities/posts';
import {isCollapsedThreadsEnabled} from 'matterfoss-redux/selectors/entities/preferences';

import {AppBindingLocations} from 'matterfoss-redux/constants/apps';
import {isSystemMessage} from 'matterfoss-redux/utils/post_utils';
import {isCombinedUserActivityPost} from 'matterfoss-redux/utils/post_list';

import {ActionFunc, GenericAction} from 'matterfoss-redux/types/actions';

import {Post} from 'matterfoss-redux/types/posts';

import {DoAppCall, PostEphemeralCallResponseForPost} from 'types/apps';
import {setThreadFollow} from 'matterfoss-redux/actions/threads';

import {GlobalState} from 'types/store';

import {openModal} from 'actions/views/modals';
import {doAppCall, postEphemeralCallResponseForPost} from 'actions/apps';

import {
    flagPost,
    unflagPost,
    pinPost,
    unpinPost,
    setEditingPost,
    markPostAsUnread,
} from 'actions/post_actions.jsx';
import * as PostUtils from 'utils/post_utils.jsx';

import {isArchivedChannel} from 'utils/channel_utils';
import {getSiteURL} from 'utils/url';

import {Locations} from 'utils/constants';

import DotMenu from './dot_menu';

type Props = {
    post: Post;
    commentCount?: number;
    isFlagged?: boolean;
    handleCommentClick: React.EventHandler<React.MouseEvent>;
    handleCardClick?: (post: Post) => void;
    handleDropdownOpened: (open: boolean) => void;
    handleAddReactionClick: () => void;
    isMenuOpen: boolean;
    isReadOnly: boolean | null;
    enableEmojiPicker?: boolean;
    location?: ComponentProps<typeof DotMenu>['location'];
};

const getPostMenuBindings = makeAppBindingsSelector(AppBindingLocations.POST_MENU_ITEM);

function mapStateToProps(state: GlobalState, ownProps: Props) {
    const {post} = ownProps;

    const license = getLicense(state);
    const config = getConfig(state);
    const userId = getCurrentUserId(state);
    const channel = getChannel(state, post.channel_id);
    const currentTeam = getCurrentTeam(state) || {};
    const currentTeamUrl = `${getSiteURL()}/${currentTeam.name}`;

    const systemMessage = isSystemMessage(post);
    const collapsedThreads = isCollapsedThreadsEnabled(state);

    const rootId = post.root_id || post.id;
    let threadId = rootId;
    let isFollowingThread = false;
    let threadReplyCount = 0;

    if (
        collapsedThreads &&
        rootId && !systemMessage &&
        (

            // default prop location would be CENTER
            !ownProps.location ||
            ownProps.location === Locations.RHS_ROOT ||
            ownProps.location === Locations.RHS_COMMENT ||
            ownProps.location === Locations.CENTER
        )
    ) {
        const root = getPost(state, rootId);
        if (root) {
            const thread = getThreadOrSynthetic(state, root);
            threadReplyCount = thread.reply_count;
            isFollowingThread = thread.is_following;
            threadId = thread.id;
        }
    }

    const apps = appsEnabled(state);
    const showBindings = apps && !systemMessage && !isCombinedUserActivityPost(post.id);
    const appBindings = showBindings ? getPostMenuBindings(state) : undefined;

    return {
        channelIsArchived: isArchivedChannel(channel),
        components: state.plugins.components,
        postEditTimeLimit: config.PostEditTimeLimit,
        isLicensed: license.IsLicensed === 'true',
        teamId: getCurrentTeamId(state),
        pluginMenuItems: state.plugins.components.PostDropdownMenu,
        canEdit: PostUtils.canEditPost(state, post, license, config, channel, userId),
        canDelete: PostUtils.canDeletePost(state, post, channel),
        currentTeamUrl,
        currentTeamId: currentTeam.id,
        userId,
        threadId,
        isFollowingThread,
        isCollapsedThreadsEnabled: collapsedThreads,
        threadReplyCount,
        appBindings,
        appsEnabled: apps,
        ...ownProps,
    };
}

type Actions = {
    flagPost: (postId: string) => void;
    unflagPost: (postId: string) => void;
    setEditingPost: (postId?: string, commentCount?: number, refocusId?: string, title?: string, isRHS?: boolean) => void;
    pinPost: (postId: string) => void;
    unpinPost: (postId: string) => void;
    openModal: (postId: any) => void;
    markPostAsUnread: (post: Post) => void;
    doAppCall: DoAppCall;
    postEphemeralCallResponseForPost: PostEphemeralCallResponseForPost;
    setThreadFollow: (userId: string, teamId: string, threadId: string, newState: boolean) => void;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            flagPost,
            unflagPost,
            setEditingPost,
            pinPost,
            unpinPost,
            openModal,
            markPostAsUnread,
            doAppCall,
            postEphemeralCallResponseForPost,
            setThreadFollow,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DotMenu);
