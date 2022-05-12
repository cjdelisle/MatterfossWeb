// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {loadRolesIfNeeded, editRole} from 'matterfoss-redux/actions/roles';

import {getRoles} from 'matterfoss-redux/selectors/entities/roles';
import {getLicense, getConfig} from 'matterfoss-redux/selectors/entities/general';
import {getScheme, makeGetSchemeTeams} from 'matterfoss-redux/selectors/entities/schemes';

import {getScheme as loadScheme, patchScheme, createScheme, getSchemeTeams as loadSchemeTeams} from 'matterfoss-redux/actions/schemes';

import {updateTeamScheme} from 'matterfoss-redux/actions/teams';

import {setNavigationBlocked} from 'actions/admin_actions';

import {ActionFunc, ActionResult, GenericAction} from 'matterfoss-redux/types/actions';
import {Role} from 'matterfoss-redux/types/roles';
import {Scheme, SchemePatch} from 'matterfoss-redux/types/schemes';
import {GlobalState} from 'matterfoss-redux/types/store';
import {ServerError} from 'matterfoss-redux/types/errors';

import PermissionTeamSchemeSettings, {Props} from './permission_team_scheme_settings';

type OwnProps = {
    match: {
        params: {
            scheme_id: string;
        };
    };
};

function makeMapStateToProps() {
    const getSchemeTeams = makeGetSchemeTeams();

    return (state: GlobalState, ownProps: OwnProps) => {
        const schemeId = ownProps.match.params.scheme_id;
        return {
            config: getConfig(state),
            license: getLicense(state),
            schemeId,
            scheme: schemeId ? getScheme(state, schemeId) : null,
            teams: schemeId ? getSchemeTeams(state, {schemeId}) : null,
            roles: getRoles(state),
        };
    };
}

type Actions = {
    loadRolesIfNeeded: (roles: Iterable<string>) => ActionFunc;
    loadScheme: (schemeId: string) => Promise<ActionResult>;
    loadSchemeTeams: (schemeId: string, page?: number, perPage?: number) => ActionFunc;
    editRole: (role: Role) => Promise<{error: ServerError}>;
    patchScheme: (schemeId: string, scheme: SchemePatch) => ActionFunc;
    updateTeamScheme: (teamId: string, schemeId: string) => Promise<{error: ServerError; data: Scheme}>;
    createScheme: (scheme: Scheme) => Promise<{error: ServerError; data: Scheme}>;
    setNavigationBlocked: (blocked: boolean) => void;
};

function mapDispatchToProps(dispatch: Dispatch<GenericAction>): Props {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>({
            loadRolesIfNeeded,
            loadScheme,
            loadSchemeTeams,
            editRole,
            patchScheme,
            updateTeamScheme,
            createScheme,
            setNavigationBlocked,
        }, dispatch),
    } as Props;
}

export default connect(makeMapStateToProps, mapDispatchToProps)(PermissionTeamSchemeSettings);
