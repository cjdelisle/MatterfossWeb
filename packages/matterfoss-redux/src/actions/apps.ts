// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {AppsTypes} from 'matterfoss-redux/action_types';
import {Client4} from 'matterfoss-redux/client';

import {ActionFunc, DispatchFunc, GetStateFunc} from 'matterfoss-redux/types/actions';

import {getChannel, getCurrentChannelId} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/common';

import {bindClientFunc} from './helpers';

// This file's contents belong to the Apps Framework feature.
// Apps Framework feature is experimental, and the contents of this file are
// susceptible to breaking changes without pushing the major version of this package.

export function fetchAppBindings(channelID: string): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        if (!channelID) {
            return {data: true};
        }

        const state = getState();
        const channel = getChannel(state, channelID);
        const userID = getCurrentUserId(state);
        const teamID = channel?.team_id || getCurrentTeamId(state);

        return dispatch(bindClientFunc({
            clientFunc: () => Client4.getAppsBindings(userID, channelID, teamID),
            onSuccess: AppsTypes.RECEIVED_APP_BINDINGS,
            onFailure: AppsTypes.FAILED_TO_FETCH_APP_BINDINGS,
        }));
    };
}

export function fetchRHSAppsBindings(channelID: string): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        const state = getState();

        const currentChannelID = getCurrentChannelId(state);
        const channel = getChannel(state, channelID);
        const teamID = channel?.team_id || getCurrentTeamId(state);

        if (channelID === currentChannelID) {
            const bindings = JSON.parse(JSON.stringify(state.entities.apps.main.bindings));
            return dispatch({
                data: bindings,
                type: AppsTypes.RECEIVED_APP_RHS_BINDINGS,
            });
        }

        const userID = getCurrentUserId(state);

        return dispatch(bindClientFunc({
            clientFunc: () => Client4.getAppsBindings(userID, channelID, teamID),
            onSuccess: AppsTypes.RECEIVED_APP_RHS_BINDINGS,
            onFailure: AppsTypes.FAILED_TO_FETCH_APP_BINDINGS,
        }));
    };
}
