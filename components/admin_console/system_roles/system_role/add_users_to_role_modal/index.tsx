// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {UserProfile} from 'matterfoss-redux/types/users';
import {GlobalState} from 'matterfoss-redux/types/store';
import {GenericAction, ActionFunc} from 'matterfoss-redux/types/actions';

import {getProfiles, searchProfiles} from 'matterfoss-redux/actions/users';

import {getProfiles as selectProfiles} from 'matterfoss-redux/selectors/entities/users';

import AddUsersToRoleModal, {Props} from './add_users_to_role_modal';

function mapStateToProps(state: GlobalState, props: Props) {
    const filterOptions: {[key: string]: any} = {active: true, exclude_roles: [props.role.name]};
    const users: UserProfile[] = selectProfiles(state, filterOptions);

    return {
        users,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            getProfiles,
            searchProfiles,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUsersToRoleModal);
