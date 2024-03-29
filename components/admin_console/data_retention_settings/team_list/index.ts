// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getDataRetentionCustomPolicyTeams, searchDataRetentionCustomPolicyTeams as searchTeams} from 'matterfoss-redux/actions/admin';
import {getTeamsInPolicy, searchTeamsInPolicy} from 'matterfoss-redux/selectors/entities/teams';
import {getDataRetentionCustomPolicy} from 'matterfoss-redux/selectors/entities/admin';
import {teamListToMap, filterTeamsStartingWithTerm} from 'matterfoss-redux/utils/team_utils';

import {ActionFunc, ActionResult, GenericAction} from 'matterfoss-redux/types/actions';

import {Team, TeamSearchOpts} from 'matterfoss-redux/types/teams';

import {GlobalState} from 'types/store';
import {setTeamListSearch} from 'actions/views/search';

import {DataRetentionCustomPolicy} from 'matterfoss-redux/types/data_retention';

import TeamList from './team_list';

type OwnProps = {
    policyId?: string;
    teamsToAdd: Record<string, Team>;
}

type Actions = {
    getDataRetentionCustomPolicyTeams: (id: string, page: number, perPage: number) => Promise<{ data: Team[] }>;
    searchTeams: (id: string, term: string, opts: TeamSearchOpts) => Promise<{ data: Team[] }>;
    setTeamListSearch: (term: string) => ActionResult;
}

function searchTeamsToAdd(teams: Record<string, Team>, term: string): Record<string, Team> {
    const filteredTeams = filterTeamsStartingWithTerm(Object.keys(teams).map((key) => teams[key]), term);
    return teamListToMap(filteredTeams);
}

function mapStateToProps() {
    const getPolicyTeams = getTeamsInPolicy();
    return (state: GlobalState, ownProps: OwnProps) => {
        let {teamsToAdd} = ownProps;

        let teams: Team[] = [];
        const policyId = ownProps.policyId;
        const policy = policyId ? getDataRetentionCustomPolicy(state, policyId) || {} as DataRetentionCustomPolicy : {} as DataRetentionCustomPolicy;
        let totalCount = 0;
        const searchTerm = state.views.search.teamListSearch || '';
        teams = policyId ? getPolicyTeams(state, {policyId}) : [];
        if (searchTerm) {
            teams = searchTeamsInPolicy(teams, searchTerm) || [];
            teamsToAdd = searchTeamsToAdd(teamsToAdd, searchTerm);
            totalCount = teams.length;
        } else if (policy?.team_count) {
            totalCount = policy.team_count;
        }

        return {
            teams,
            totalCount,
            searchTerm,
            teamsToAdd,
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>({
            getDataRetentionCustomPolicyTeams,
            searchTeams,
            setTeamListSearch,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
