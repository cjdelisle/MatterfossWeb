// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getConfig, getLicense} from 'matterfoss-redux/selectors/entities/general';

import Permissions from 'matterfoss-redux/constants/permissions';

import GuestPermissionsTree from './guest_permissions_tree.jsx';

export const GUEST_INCLUDED_PERMISSIONS = [
    Permissions.CREATE_PRIVATE_CHANNEL,
    Permissions.EDIT_POST,
    Permissions.DELETE_POST,
    Permissions.ADD_REACTION,
    Permissions.REMOVE_REACTION,
    Permissions.USE_CHANNEL_MENTIONS,
    Permissions.USE_GROUP_MENTIONS,
    Permissions.CREATE_POST,
];

function mapStateToProps(state) {
    const config = getConfig(state);
    const license = getLicense(state);

    return {
        config,
        license,
    };
}

export default connect(mapStateToProps)(GuestPermissionsTree);
