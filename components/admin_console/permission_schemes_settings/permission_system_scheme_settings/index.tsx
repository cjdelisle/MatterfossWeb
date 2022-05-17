// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'matterfoss-redux/types/store.js';
import {ActionFunc, ActionResult, GenericAction} from 'matterfoss-redux/types/actions.js';
import {Role} from 'matterfoss-redux/types/roles.js';

import {loadRolesIfNeeded, editRole} from 'matterfoss-redux/actions/roles';
import {getRoles} from 'matterfoss-redux/selectors/entities/roles';
import {getLicense, getConfig} from 'matterfoss-redux/selectors/entities/general';

import {setNavigationBlocked} from 'actions/admin_actions.jsx';

import PermissionSystemSchemeSettings from './permission_system_scheme_settings';

function mapStateToProps(state: GlobalState) {
    return {
        config: getConfig(state),
        license: getLicense(state),
        roles: getRoles(state),
    };
}
type Actions = {
    loadRolesIfNeeded: (roles: Iterable<string>) => void;
    editRole: (role: Partial<Role>) => Promise<ActionResult>;
    setNavigationBlocked: (blocked: boolean) => void;
};

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>({
            loadRolesIfNeeded,
            editRole,
            setNavigationBlocked,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionSystemSchemeSettings);
