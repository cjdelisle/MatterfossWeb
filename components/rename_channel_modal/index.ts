// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {createSelector} from 'reselect';

import {patchChannel} from 'matterfoss-redux/actions/channels';
import {getTeam} from 'matterfoss-redux/selectors/entities/teams';
import {GlobalState} from 'matterfoss-redux/types/store';
import {ActionFunc, GenericAction} from 'matterfoss-redux/types/actions';
import {Channel} from 'matterfoss-redux/types/channels';

import {getSiteURL} from 'utils/url';

import RenameChannelModal from './rename_channel_modal';

type Actions = {
    patchChannel(channelId: string, patch: Channel): Promise<{ data: Channel; error: Error }>;
};

const mapStateToPropsRenameChannel = createSelector(
    'mapStateToPropsRenameChannel',
    (state: GlobalState) => {
        const currentTeamId = state.entities.teams.currentTeamId;
        const team = getTeam(state, currentTeamId);
        const currentTeamUrl = `${getSiteURL()}/${team.name}`;
        return {
            currentTeamUrl,
            team,
        };
    },
    (teamInfo) => ({...teamInfo}),
);

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            patchChannel,
        }, dispatch),
    };
}

export default connect(mapStateToPropsRenameChannel, mapDispatchToProps)(RenameChannelModal);
