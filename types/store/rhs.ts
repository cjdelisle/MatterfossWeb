// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Post, PostType} from 'matterfoss-redux/types/posts';
import {Channel} from 'matterfoss-redux/types/channels';
import {UserProfile} from 'matterfoss-redux/types/users';
import {FileInfo} from 'matterfoss-redux/types/files';
import {$ID} from 'matterfoss-redux/types/utilities';

export type FakePost = {
    id: $ID<Post>;
    exists: boolean;
    type: PostType;
    message: string;
    channel_id: $ID<Channel>;
    user_id: $ID<UserProfile>;
};

export type PostDraft = {
    message: string;
    fileInfos: Array<FileInfo>;
    uploadsInProgress: Array<string>;
};

export type RhsViewState = {
    selectedPostId: $ID<Post>;
    selectedPostFocussedAt: number;
    selectedPostCardId: $ID<Post>;
    selectedChannelId: $ID<Channel>;
    previousRhsState: RhsState;
    rhsState: RhsState;
    searchTerms: string;
    pluggableId: string;
    searchResultsTerms: string;
    isSearchingFlaggedPost: boolean;
    isSearchingPinnedPost: boolean;
    isSidebarOpen: boolean;
    isSidebarExpanded: boolean;
    isMenuOpen: boolean;
};

export type RhsState = 'mention' | 'search' | 'flag' | 'pin' | 'plugin';
