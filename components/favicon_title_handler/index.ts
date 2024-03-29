// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ComponentProps} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {withRouter, RouteChildrenProps, matchPath} from 'react-router-dom';

import {getCurrentChannel, getUnreadStatus} from 'matterfoss-redux/selectors/entities/channels';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {GlobalState} from 'matterfoss-redux/types/store';
import {GenericAction} from 'matterfoss-redux/types/actions';

import FaviconTitleHandler from './favicon_title_handler';

type Props = RouteChildrenProps;

function mapStateToProps(state: GlobalState, {location: {pathname}}: Props): ComponentProps<typeof FaviconTitleHandler> {
    const config = getConfig(state);
    const currentChannel = getCurrentChannel(state);
    const currentTeammate = (currentChannel && currentChannel.teammate_id) ? currentChannel : null;
    const currentTeam = getCurrentTeam(state);

    return {
        currentChannel,
        currentTeam,
        currentTeammate,
        siteName: config.SiteName,
        unreadStatus: getUnreadStatus(state),
        inGlobalThreads: matchPath(pathname, {path: '/:team/threads/:threadIdentifier?'}) != null,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FaviconTitleHandler));
