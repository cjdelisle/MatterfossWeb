// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {Preferences} from 'matterfoss-redux/constants';
import {getBool} from 'matterfoss-redux/selectors/entities/preferences';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';

import NewChannelModal from './new_channel_modal.jsx';

function mapStateToProps(state) {
    return {
        ctrlSend: getBool(state, Preferences.CATEGORY_ADVANCED_SETTINGS, 'send_on_ctrl_enter'),
        currentTeamId: getCurrentTeamId(state),
    };
}

export default connect(mapStateToProps)(NewChannelModal);
