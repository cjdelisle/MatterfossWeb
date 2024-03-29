// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {Action, ActionResult} from 'matterfoss-redux/types/actions';

import {GlobalState} from 'types/store';

import {addUsersToGroup} from 'matterfoss-redux/actions/groups';
import {getGroup} from 'matterfoss-redux/selectors/entities/groups';
import {ModalData} from 'types/actions';
import {openModal} from 'actions/views/modals';

import AddUsersToGroupModal from './add_users_to_group_modal';

type Actions = {
    addUsersToGroup: (groupId: string, userIds: string[]) => Promise<ActionResult>;
    openModal: <P>(modalData: ModalData<P>) => void;
}

type OwnProps = {
    groupId: string;
}

function makeMapStateToProps() {
    return (state: GlobalState, props: OwnProps) => {
        const group = getGroup(state, props.groupId);

        return {
            group,
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            addUsersToGroup,
            openModal,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(AddUsersToGroupModal);
