// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {createSelector} from 'reselect';

import {RequestStatus} from 'matterfoss-redux/constants';
import {Channel} from 'matterfoss-redux/types/channels';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {Action, ActionResult} from 'matterfoss-redux/types/actions';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {getChannels, getArchivedChannels, joinChannel} from 'matterfoss-redux/actions/channels';
import {getOtherChannels, getChannelsInCurrentTeam} from 'matterfoss-redux/selectors/entities/channels';

import {searchMoreChannels} from 'actions/channel_actions.jsx';
import {openModal, closeModal} from 'actions/views/modals';

import {ModalData} from 'types/actions';
import {GlobalState} from 'types/store';

import MoreChannels from './more_channels';

const getNotArchivedOtherChannels = createSelector(
    'getNotArchivedOtherChannels',
    getOtherChannels,
    (channels: Channel[]) => channels && channels.filter((c) => c.delete_at === 0),
);

const getArchivedOtherChannels = createSelector(
    'getArchivedOtherChannels',
    getChannelsInCurrentTeam,
    (channels: Channel[]) => channels && channels.filter((c) => c.delete_at !== 0),
);

function mapStateToProps(state: GlobalState) {
    const team = getCurrentTeam(state) || {};

    return {
        channels: getNotArchivedOtherChannels(state) || [],
        archivedChannels: getArchivedOtherChannels(state) || [],
        currentUserId: getCurrentUserId(state),
        teamId: team.id,
        teamName: team.name,
        channelsRequestStarted: state.requests.channels.getChannels.status === RequestStatus.STARTED,
        canShowArchivedChannels: (getConfig(state).ExperimentalViewArchivedChannels === 'true'),
    };
}

type Actions = {
    getChannels: (teamId: string, page: number, perPage: number) => void;
    getArchivedChannels: (teamId: string, page: number, channelsPerPage: number) => void;
    joinChannel: (currentUserId: string, teamId: string, channelId: string) => Promise<ActionResult>;
    searchMoreChannels: (term: string, shouldShowArchivedChannels: boolean) => Promise<ActionResult>;
    openModal: <P>(modalData: ModalData<P>) => void;
    closeModal: (modalId: string) => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            getChannels,
            getArchivedChannels,
            joinChannel,
            searchMoreChannels,
            openModal,
            closeModal,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreChannels);
