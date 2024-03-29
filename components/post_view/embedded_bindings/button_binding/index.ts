// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {ActionResult, GenericAction} from 'matterfoss-redux/types/actions';

import {getChannel} from 'matterfoss-redux/actions/channels';

import {PostEphemeralCallResponseForPost, HandleBindingClick, OpenAppsModal} from 'types/apps';

import {postEphemeralCallResponseForPost, handleBindingClick, openAppsModal} from 'actions/apps';

import ButtonBinding from './button_binding';

type Actions = {
    handleBindingClick: HandleBindingClick;
    getChannel: (channelId: string) => Promise<ActionResult>;
    postEphemeralCallResponseForPost: PostEphemeralCallResponseForPost;
    openAppsModal: OpenAppsModal;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<any>, Actions>({
            handleBindingClick,
            getChannel,
            postEphemeralCallResponseForPost,
            openAppsModal,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(ButtonBinding);
