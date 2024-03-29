// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCurrentRelativeTeamUrl} from 'matterfoss-redux/selectors/entities/teams';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';

import {getSelectedPostCard} from 'selectors/rhs';
import {getIsMobileView} from 'selectors/views/browser';

import RhsCard from './rhs_card.jsx';

function mapStateToProps(state) {
    const selected = getSelectedPostCard(state);
    const config = getConfig(state);
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';

    return {
        enablePostUsernameOverride,
        isMobileView: getIsMobileView(state),
        selected,
        pluginPostCardTypes: state.plugins.postCardTypes,
        teamUrl: getCurrentRelativeTeamUrl(state),
    };
}

export default connect(mapStateToProps)(RhsCard);
