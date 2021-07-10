// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';

import {GlobalState} from 'matterfoss-redux/types/store';

import TeamSettings from './team_settings';

function mapStateToProps(state: GlobalState) {
    return {
        team: getCurrentTeam(state),
    };
}

export default connect(mapStateToProps)(TeamSettings);
