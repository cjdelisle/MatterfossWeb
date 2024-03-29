// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {setCategoryCollapsed, setCategorySorting} from 'matterfoss-redux/actions/channel_categories';
import {GenericAction} from 'matterfoss-redux/types/actions';
import {savePreferences} from 'matterfoss-redux/actions/preferences';
import {ChannelCategory} from 'matterfoss-redux/types/channel_categories';
import {getBool} from 'matterfoss-redux/selectors/entities/preferences';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {Preferences, Touched} from 'utils/constants';

import {getDraggingState, makeGetFilteredChannelIdsForCategory} from 'selectors/views/channel_sidebar';
import {GlobalState} from 'types/store';

import SidebarCategory from './sidebar_category';

type OwnProps = {
    category: ChannelCategory;
}

function makeMapStateToProps() {
    const getChannelIdsForCategory = makeGetFilteredChannelIdsForCategory();

    return (state: GlobalState, ownProps: OwnProps) => {
        return {
            channelIds: getChannelIdsForCategory(state, ownProps.category),
            draggingState: getDraggingState(state),
            touchedInviteMembersButton: getBool(state, Preferences.TOUCHED, Touched.INVITE_MEMBERS),
            currentUserId: getCurrentUserId(state),
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            setCategoryCollapsed,
            setCategorySorting,
            savePreferences,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(SidebarCategory);
