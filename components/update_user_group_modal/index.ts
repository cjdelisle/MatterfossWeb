// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {Action, ActionResult} from 'matterfoss-redux/types/actions';

import {GlobalState} from 'types/store';

import {CustomGroupPatch} from 'matterfoss-redux/types/groups';
import {patchGroup} from 'matterfoss-redux/actions/groups';
import {ModalData} from 'types/actions';
import {openModal} from 'actions/views/modals';
import {getGroup} from 'matterfoss-redux/selectors/entities/groups';

import UpdateUserGroupModal from './update_user_group_modal';

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

type Actions = {
    patchGroup: (groupId: string, group: CustomGroupPatch) => Promise<ActionResult>;
    openModal: <P>(modalData: ModalData<P>) => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            patchGroup,
            openModal,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(UpdateUserGroupModal);
