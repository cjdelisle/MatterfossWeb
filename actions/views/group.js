// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {searchAssociatedGroupsForReferenceLocal} from 'matterfoss-redux/selectors/entities/groups';
import {isCustomGroupsEnabled} from 'matterfoss-redux/selectors/entities/preferences';
import {haveIChannelPermission} from 'matterfoss-redux/selectors/entities/roles';
import {searchGroups} from 'matterfoss-redux/actions/groups';
import Permissions from 'matterfoss-redux/constants/permissions';

export function searchAssociatedGroupsForReference(prefix, teamId, channelId) {
    return async (dispatch, getState) => {
        const state = getState();
        if (!haveIChannelPermission(state,
            teamId,
            channelId,
            Permissions.USE_GROUP_MENTIONS,
        )) {
            return {data: []};
        }

        if (isCustomGroupsEnabled(state)) {
            await dispatch(searchGroups({q: prefix, filter_allow_reference: true, page: 0, per_page: 60, include_member_count: true}));
        }
        return {data: searchAssociatedGroupsForReferenceLocal(state, prefix, teamId, channelId)};
    };
}
