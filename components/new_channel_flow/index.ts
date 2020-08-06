// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {ActionFunc, GenericAction} from 'matterfoss-redux/types/actions';
import {Channel} from 'matterfoss-redux/types/channels';
import {ServerError} from 'matterfoss-redux/types/errors';
import {createChannel} from 'matterfoss-redux/actions/channels';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {GlobalState} from 'matterfoss-redux/types/store';

import {switchToChannel} from 'actions/views/channel';

import NewChannelFlow from './new_channel_flow';

type Actions = {
    createChannel: (channel: Channel) => Promise<{data: Channel; error?: ServerError}>;
    switchToChannel: (channel: Channel) => Promise<{}>;
}

function mapStateToProps(state: GlobalState) {
    return {
        currentTeamId: getCurrentTeamId(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            createChannel,
            switchToChannel,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewChannelFlow);
