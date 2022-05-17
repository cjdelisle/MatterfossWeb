// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {createIncomingHook} from 'matterfoss-redux/actions/integrations';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';

import {GlobalState} from 'matterfoss-redux/types/store';
import {Action, GenericAction} from 'matterfoss-redux/types/actions';
import {IncomingWebhook} from 'matterfoss-redux/types/integrations';

import AddIncomingWebhook from './add_incoming_webhook';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const enablePostUsernameOverride = config.EnablePostUsernameOverride === 'true';
    const enablePostIconOverride = config.EnablePostIconOverride === 'true';

    return {
        enablePostUsernameOverride,
        enablePostIconOverride,
    };
}

type Actions = {
    createIncomingHook: (hook: IncomingWebhook) => Promise<{ data?: IncomingWebhook; error?: Error }>;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            createIncomingHook,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIncomingWebhook);
