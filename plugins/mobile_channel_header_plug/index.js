// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {getTheme} from 'matterfoss-redux/selectors/entities/preferences';
import {getMyCurrentChannelMembership} from 'matterfoss-redux/selectors/entities/channels';

import MobileChannelHeaderPlug from './mobile_channel_header_plug.jsx';

function mapStateToProps(state) {
    return {
        channelMember: getMyCurrentChannelMembership(state),
        components: state.plugins.components.MobileChannelHeaderButton,
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(MobileChannelHeaderPlug);
