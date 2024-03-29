// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getCurrentChannel} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';

import {focusPost} from './actions';
import PermalinkView from './permalink_view.jsx';

function mapStateToProps(state) {
    const team = getCurrentTeam(state);
    const channel = getCurrentChannel(state);
    const currentUserId = getCurrentUserId(state);
    const channelId = channel ? channel.id : '';
    const teamName = team ? team.name : '';

    return {
        channelId,
        teamName,
        currentUserId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            focusPost,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PermalinkView);
