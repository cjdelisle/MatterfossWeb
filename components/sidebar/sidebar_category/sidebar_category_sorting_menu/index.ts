// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {setCategorySorting} from 'matterfoss-redux/actions/channel_categories';
import {savePreferences} from 'matterfoss-redux/actions/preferences';
import {GenericAction} from 'matterfoss-redux/types/actions';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {getInt} from 'matterfoss-redux/selectors/entities/preferences';
import {Preferences} from 'matterfoss-redux/constants';

import {GlobalState} from 'types/store';

import SidebarCategorySortingMenu from './sidebar_category_sorting_menu';

function mapStateToProps() {
    return (state: GlobalState) => {
        const selectedDmNumber = getInt(state, Preferences.CATEGORY_SIDEBAR_SETTINGS, Preferences.LIMIT_VISIBLE_DMS_GMS, 20);

        return {
            selectedDmNumber,
            currentUserId: getCurrentUserId(state),
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            setCategorySorting,
            savePreferences,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarCategorySortingMenu);
