// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {$ID} from 'matterfoss-redux/types/utilities';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {getThreads} from 'matterfoss-redux/selectors/entities/threads';
import {Team} from 'matterfoss-redux/types/teams';
import {UserThread} from 'matterfoss-redux/types/threads';

import {GlobalState} from 'types/store';
import {ViewsState} from 'types/store/views';

export function getSelectedThreadIdInTeam(state: GlobalState) {
    return state.views.threads.selectedThreadIdInTeam;
}

export const getSelectedThreadIdInCurrentTeam: (state: GlobalState) => ViewsState['threads']['selectedThreadIdInTeam'][$ID<Team>] = createSelector(
    getCurrentTeamId,
    getSelectedThreadIdInTeam,
    (
        currentTeamId,
        selectedThreadIdInTeam,
    ) => {
        return selectedThreadIdInTeam?.[currentTeamId] ?? null;
    },
);

export const getSelectedThreadInCurrentTeam: (state: GlobalState) => UserThread | null = createSelector(
    getCurrentTeamId,
    getSelectedThreadIdInTeam,
    getThreads,
    (
        currentTeamId,
        selectedThreadIdInTeam,
        threads,
    ) => {
        const threadId = selectedThreadIdInTeam?.[currentTeamId];
        return threadId ? threads[threadId] : null;
    },
);
