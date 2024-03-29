// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {useEffect} from 'react';
import {AnyAction, Dispatch} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from 'react-router-dom';

import {getChannelByName} from 'matterfoss-redux/selectors/entities/channels';
import {Client4} from 'matterfoss-redux/client';
import {IntegrationTypes} from 'matterfoss-redux/action_types';
import {Channel} from 'matterfoss-redux/types/channels';
import {getTeamByName} from 'matterfoss-redux/selectors/entities/teams';
import {generateId} from 'matterfoss-redux/utils/helpers';

import {switchToChannel} from 'actions/views/channel';
import {getLastViewedChannelNameByTeamName} from 'selectors/local_storage';
import {GlobalState} from 'types/store';

interface MatchParams {
    team: string;
    playbookId: string;
}

const PlaybookRunner = () => {
    const match = useRouteMatch<MatchParams>();
    const dispatch = useDispatch();

    const teamName = match.params.team;
    const playbookId = match.params.playbookId;

    const team = useSelector((state: GlobalState) => getTeamByName(state, teamName));

    const lastViewedChannelName = useSelector((state: GlobalState) => getLastViewedChannelNameByTeamName(state, teamName));
    const lastViewedChannel = useSelector((state: GlobalState) => getChannelByName(state, lastViewedChannelName));

    useEffect(() => {
        const switchToChannelAndStartRun = async () => {
            const channelToSwitchTo = lastViewedChannel ?? await Client4.getChannelByName(team?.id || '', 'town-square');

            dispatch(switchToChannel(channelToSwitchTo));
            dispatch(startPlaybookRunById(channelToSwitchTo, team?.id || '', playbookId));
        };

        switchToChannelAndStartRun();
    }, []);

    return null;
};

function startPlaybookRunById(currentChannel: Channel, teamId: string, playbookId: string) {
    return async (dispatch: Dispatch<AnyAction>) => {
        // Generate a unique id for the command and send it to Playbooks
        const clientId = generateId();
        dispatch({type: 'playbooks_set_client_id', clientId});

        const command = `/playbook run-playbook ${playbookId} ${clientId}`;

        const args = {
            channel_id: currentChannel.id,
            team_id: teamId,
        };

        try {
            const data = await Client4.executeCommand(command, args);
            dispatch({type: IntegrationTypes.RECEIVED_DIALOG_TRIGGER_ID, data: data?.trigger_id});
        } catch (error) {
            console.error(error); //eslint-disable-line no-console
        }
    };
}

export default PlaybookRunner;
