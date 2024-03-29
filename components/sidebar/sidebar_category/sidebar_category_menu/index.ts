// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {Dispatch, bindActionCreators, ActionCreatorsMapObject} from 'redux';

import {setCategoryMuted, setCategorySorting} from 'matterfoss-redux/actions/channel_categories';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {Action} from 'matterfoss-redux/types/actions';
import {CategorySorting} from 'matterfoss-redux/types/channel_categories';
import {GlobalState} from 'matterfoss-redux/types/store';

import {openModal} from 'actions/views/modals';

import {ModalData} from 'types/actions';

import SidebarCategoryMenu from './sidebar_category_menu';

function makeMapStateToProps() {
    return (state: GlobalState) => {
        const currentTeam = getCurrentTeam(state);

        return {
            currentTeamId: currentTeam.id,
        };
    };
}

type Actions = {
    openModal: <P>(modalData: ModalData<P>) => void;
    setCategoryMuted: (categoryId: string, muted: boolean) => void;
    setCategorySorting: (categoryId: string, sorting: CategorySorting) => void;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<Action>, Actions>({
            openModal,
            setCategoryMuted,
            setCategorySorting,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(SidebarCategoryMenu);
