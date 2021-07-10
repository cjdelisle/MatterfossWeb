// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUserMentionKeys} from 'matterfoss-redux/selectors/entities/users';
import {getMyGroupMentionKeys} from 'matterfoss-redux/selectors/entities/groups';

import {GlobalState} from 'matterfoss-redux/types/store';

import {UserMentionKey} from './users';

export const getCurrentSearchForCurrentTeam: (state: GlobalState) => string = createSelector(
    (state: GlobalState) => state.entities.search.current,
    getCurrentTeamId,
    (current, teamId) => {
        return current[teamId];
    },
);

export const getAllUserMentionKeys: (state: GlobalState) => UserMentionKey[] = createSelector(
    getCurrentUserMentionKeys,
    getMyGroupMentionKeys,
    (userMentionKeys, groupMentionKeys) => {
        return userMentionKeys.concat(groupMentionKeys);
    },
);
