// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {RouteComponentProps} from 'react-router';

import {deleteScheme} from 'matterfoss-redux/actions/schemes';

import {makeGetSchemeTeams} from 'matterfoss-redux/selectors/entities/schemes';

import {ActionFunc, ActionResult, GenericAction} from 'matterfoss-redux/types/actions';
import {GlobalState} from 'matterfoss-redux/types/store';

import PermissionsSchemeSummary, {Props} from './permissions_scheme_summary';

function makeMapStateToProps() {
    const getSchemeTeams = makeGetSchemeTeams();

    return function mapStateToProps(state: GlobalState, props: Props & RouteComponentProps) {
        return {
            teams: getSchemeTeams(state, {schemeId: props.scheme.id}),
        };
    };
}

type Actions = {
    deleteScheme: (schemeId: string) => Promise<ActionResult>;
};

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            deleteScheme,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(PermissionsSchemeSummary);
