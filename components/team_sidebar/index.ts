// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {GlobalState} from 'matterfoss-redux/types/store';
import {GenericAction} from 'matterfoss-redux/types/actions';
import {getMyTeams} from 'matterfoss-redux/selectors/entities/teams';

import TeamSidebar from './team_sidebar';

function mapStateToProps(state: GlobalState) {
    return {
        teams: getMyTeams(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSidebar);
