// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {getCurrentUser} from 'matterfoss-redux/selectors/entities/common';

import {GlobalState} from 'matterfoss-redux/types/store';
import {UserProfile} from 'matterfoss-redux/types/users';

export type PermissionsOptions = {
    channel?: string;
    team?: string;
    permission: string;
};

export function getRoles(state: GlobalState) {
    return state.entities.roles.roles;
}

export const getMySystemRoles: (state: GlobalState) => Set<string> = createSelector(
    'getMySystemRoles',
    getCurrentUser,
    (user: UserProfile) => {
        if (user) {
            return new Set<string>(user.roles.split(' '));
        }

        return new Set<string>();
    },
);

export const getMySystemPermissions: (state: GlobalState) => Set<string> = createSelector(
    'getMySystemPermissions',
    getMySystemRoles,
    getRoles,
    (mySystemRoles: Set<string>, roles) => {
        const permissions = new Set<string>();

        for (const roleName of mySystemRoles) {
            if (roles[roleName]) {
                for (const permission of roles[roleName].permissions) {
                    permissions.add(permission);
                }
            }
        }

        return permissions;
    },
);

export const haveISystemPermission: (state: GlobalState, options: PermissionsOptions) => boolean = createSelector(
    'haveISystemPermission',
    getMySystemPermissions,
    (state: GlobalState, options: PermissionsOptions) => options.permission,
    (permissions, permission) => {
        return permissions.has(permission);
    },
);
