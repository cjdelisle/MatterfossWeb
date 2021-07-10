// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createSelector} from 'reselect';
import {withRouter, matchPath} from 'react-router-dom';

import {getCurrentUser} from 'matterfoss-redux/selectors/entities/users';
import {
    getCurrentChannel,
    getMyCurrentChannelMembership,
    isCurrentChannelReadOnly,
} from 'matterfoss-redux/selectors/entities/channels';
import {getCurrentRelativeTeamUrl} from 'matterfoss-redux/selectors/entities/teams';
import {isChannelMuted} from 'matterfoss-redux/utils/channel_utils';

import {
    closeRightHandSide as closeRhs,
    closeMenu as closeRhsMenu,
} from 'actions/views/rhs';
import {close as closeLhs} from 'actions/views/lhs';

import {getIsRhsOpen} from 'selectors/rhs';

import ChannelHeaderMobile from './channel_header_mobile';

const isCurrentChannelMuted = createSelector(
    getMyCurrentChannelMembership,
    (membership) => isChannelMuted(membership),
);

const mapStateToProps = (state, {location: {pathname}}) => ({
    user: getCurrentUser(state),
    channel: getCurrentChannel(state),
    isMuted: isCurrentChannelMuted(state),
    isReadOnly: isCurrentChannelReadOnly(state),
    isRHSOpen: getIsRhsOpen(state),
    currentRelativeTeamUrl: getCurrentRelativeTeamUrl(state),
    inGlobalThreads: Boolean(matchPath(pathname, {path: '/:team/threads/:threadIdentifier?'})),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        closeLhs,
        closeRhs,
        closeRhsMenu,
    }, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelHeaderMobile));
