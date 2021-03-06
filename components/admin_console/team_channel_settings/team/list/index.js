// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';

import {getTeams as fetchTeams, searchTeams} from 'matterfoss-redux/actions/teams';
import {getTeams} from 'matterfoss-redux/selectors/entities/teams';

import TeamList from './team_list.jsx';

const getSortedListOfTeams = createSelector(
    getTeams,
    (teams) => Object.values(teams).sort((a, b) => a.display_name.localeCompare(b.display_name)),
);

function mapStateToProps(state) {
    return {
        data: getSortedListOfTeams(state),
        total: state.entities.teams.totalCount || 0,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getData: (page, pageSize) => fetchTeams(page, pageSize, true),
            searchTeams,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);
