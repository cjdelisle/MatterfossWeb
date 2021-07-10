// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useMemo} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {UserThread} from 'matterfoss-redux/types/threads';
import {$ID, $Name} from 'matterfoss-redux/types/utilities';
import {Team} from 'matterfoss-redux/types/teams';

import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';

/**
 * GlobalThreads-specific hook for nav/routing, selection, and common data needed for actions.
 */
export function useThreadRouting() {
    const {params} = useRouteMatch<{team: string; threadIdentifier?: $ID<UserThread>}>();
    const history = useHistory();
    const currentTeamId = useSelector(getCurrentTeamId);
    const currentUserId = useSelector(getCurrentUserId);
    return useMemo(() => ({
        params,
        history,
        currentTeamId,
        currentUserId,
        clear: () => history.replace(`/${params.team}/threads`),
        select: (threadId?: $ID<UserThread>) => history.push(`/${params.team}/threads${threadId ? '/' + threadId : ''}`),
        goToInChannel: (threadId?: $ID<UserThread>, teamName: $Name<Team> = params.team) => history.push(`/${teamName}/pl/${threadId ?? params.threadIdentifier}`),
    }), [params.team, params.threadIdentifier, currentTeamId, currentUserId]);
}
