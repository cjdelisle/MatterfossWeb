// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {Dispatch, bindActionCreators, ActionCreatorsMapObject} from 'redux';

import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';
import {ActionFunc} from 'matterfoss-redux/types/actions';
import {GlobalState} from 'matterfoss-redux/types/store';

import {openModal} from 'actions/views/modals';

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
    openModal: (modalData: {modalId: string; dialogType: React.Component; dialogProps?: any}) => Promise<{
        data: boolean;
    }>;
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            openModal,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(SidebarCategoryMenu);
