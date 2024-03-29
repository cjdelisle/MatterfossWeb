// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ComponentProps} from 'react';
import {connect} from 'react-redux';

import {getInt, isCollapsedThreadsEnabled} from 'matterfoss-redux/selectors/entities/preferences';

import {getCurrentTeamId, getCurrentRelativeTeamUrl} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUserId, getCurrentUserMentionKeys} from 'matterfoss-redux/selectors/entities/users';

import {setThreadFollow} from 'matterfoss-redux/actions/threads';
import {getThreadOrSynthetic} from 'matterfoss-redux/selectors/entities/threads';
import {getPost} from 'matterfoss-redux/selectors/entities/posts';

import {GlobalState} from 'types/store';

import {
    setRhsExpanded,
    showMentions,
    showSearchResults,
    showFlaggedPosts,
    showPinnedPosts,
    showChannelFiles,
    closeRightHandSide,
    toggleRhsExpanded,
} from 'actions/views/rhs';
import {getIsRhsExpanded} from 'selectors/rhs';
import {CrtThreadPaneSteps, Preferences} from 'utils/constants';
import {getIsMobileView} from 'selectors/views/browser';

import {allAtMentions} from 'utils/text_formatting';
import {matchUserMentionTriggersWithMessageMentions} from 'utils/post_utils';

import RhsHeaderPost from './rhs_header_post';

type OwnProps = Pick<ComponentProps<typeof RhsHeaderPost>, 'rootPostId'>

function mapStateToProps(state: GlobalState, {rootPostId}: OwnProps) {
    let isFollowingThread = false;

    const collapsedThreads = isCollapsedThreadsEnabled(state);
    const root = getPost(state, rootPostId);
    const currentUserId = getCurrentUserId(state);
    const tipStep = getInt(state, Preferences.CRT_THREAD_PANE_STEP, currentUserId);

    if (root && collapsedThreads) {
        const thread = getThreadOrSynthetic(state, root);
        isFollowingThread = thread.is_following;

        if (isFollowingThread === null && thread.reply_count === 0) {
            const currentUserMentionKeys = getCurrentUserMentionKeys(state);
            const rootMessageMentionKeys = allAtMentions(root.message);

            isFollowingThread = matchUserMentionTriggersWithMessageMentions(currentUserMentionKeys, rootMessageMentionKeys);
        }
    }

    const showThreadsTutorialTip = tipStep === CrtThreadPaneSteps.THREADS_PANE_POPOVER && isCollapsedThreadsEnabled(state);

    return {
        isExpanded: getIsRhsExpanded(state),
        isMobileView: getIsMobileView(state),
        relativeTeamUrl: getCurrentRelativeTeamUrl(state),
        currentTeamId: getCurrentTeamId(state),
        currentUserId,
        isCollapsedThreadsEnabled: collapsedThreads,
        isFollowingThread,
        showThreadsTutorialTip,
    };
}

const actions = {
    setRhsExpanded,
    showSearchResults,
    showMentions,
    showFlaggedPosts,
    showPinnedPosts,
    showChannelFiles,
    closeRightHandSide,
    toggleRhsExpanded,
    setThreadFollow,
};

export default connect(mapStateToProps, actions)(RhsHeaderPost);
