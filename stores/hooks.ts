// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useCallback} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

import {createSelector} from 'reselect';

import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';

import {makeGetGlobalItem} from 'selectors/storage';
import {setGlobalItem} from 'actions/storage';

export const currentUserAndTeamSuffix = createSelector('currentUserAndTeamSuffix', [
    getCurrentUserId,
    getCurrentTeamId,
], (
    userId,
    teamId,
) => {
    return `:${userId}:${teamId}`;
});

export const currentUserSuffix = createSelector('currentUserSuffix', [
    getCurrentUserId,
], (
    userId,
) => {
    return `:${userId}`;
});

/**
 *
 * @param initialValue
 * @param name name of stored value, prepended to suffix
 * @param suffix to provide scope; defaults to user and team
 */
export function useGlobalState<TVal>(
    initialValue: TVal,
    name: string,
    suffix: string = useSelector(currentUserAndTeamSuffix),
): [TVal, (value: TVal) => ReturnType<typeof setGlobalItem>] {
    const dispatch = useDispatch();
    const storedKey = `${name}${suffix}`;

    const value = useSelector(makeGetGlobalItem(storedKey, initialValue), shallowEqual);
    const setValue = useCallback((newValue) => dispatch(setGlobalItem(storedKey, newValue)), [storedKey]);

    return [
        value,
        setValue,
    ];
}
