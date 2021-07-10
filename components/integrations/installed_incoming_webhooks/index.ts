// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {removeIncomingHook} from 'matterfoss-redux/actions/integrations';

import {getAllChannels} from 'matterfoss-redux/selectors/entities/channels';
import {getIncomingHooks} from 'matterfoss-redux/selectors/entities/integrations';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {getUsers} from 'matterfoss-redux/selectors/entities/users';
import {GlobalState} from 'matterfoss-redux/types/store';
import {haveITeamPermission} from 'matterfoss-redux/selectors/entities/roles';
import {Permissions} from 'matterfoss-redux/constants';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {ActionResult, GenericAction} from 'matterfoss-redux/types/actions';

import {loadIncomingHooksAndProfilesForTeam} from 'actions/integration_actions.jsx';

import InstalledIncomingWebhooks from './installed_incoming_webhooks';

type Actions = {
    removeIncomingHook: (hookId: string) => Promise<ActionResult>;
    loadIncomingHooksAndProfilesForTeam: (teamId: string, startPageNumber: number, pageSize: string) => Promise<ActionResult>;
}

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const teamId = getCurrentTeamId(state);
    const canManageOthersWebhooks = haveITeamPermission(state, {team: teamId, permission: Permissions.MANAGE_OTHERS_INCOMING_WEBHOOKS});
    const incomingHooks = getIncomingHooks(state);
    const incomingWebhooks = Object.keys(incomingHooks).
        map((key) => incomingHooks[key]).
        filter((incomingWebhook) => incomingWebhook.team_id === teamId);
    const enableIncomingWebhooks = config.EnableIncomingWebhooks === 'true';

    return {
        incomingWebhooks,
        channels: getAllChannels(state),
        users: getUsers(state),
        canManageOthersWebhooks,
        enableIncomingWebhooks,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<any>, Actions>({
            loadIncomingHooksAndProfilesForTeam,
            removeIncomingHook,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstalledIncomingWebhooks);
