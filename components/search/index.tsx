// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {AnyAction, bindActionCreators, Dispatch} from 'redux';

import {getMorePostsForSearch, getMoreFilesForSearch} from 'matterfoss-redux/actions/search';
import {getCurrentChannel} from 'matterfoss-redux/selectors/entities/channels';

import {
    updateSearchTerms,
    updateSearchTermsForShortcut,
    showSearchResults,
    showChannelFiles,
    showMentions,
    showFlaggedPosts,
    closeRightHandSide,
    updateRhsState,
    setRhsExpanded,
    openRHSSearch,
    filterFilesSearchByExt,
    updateSearchType,
} from 'actions/views/rhs';
import {autocompleteChannelsForSearch} from 'actions/channel_actions';
import {autocompleteUsersInTeam} from 'actions/user_actions';

import {getRhsState, getSearchTerms, getSearchType, getIsSearchingTerm, getIsRhsOpen, getIsRhsExpanded} from 'selectors/rhs';
import {getIsMobileView} from 'selectors/views/browser';

import {GlobalState} from 'types/store';

import {RHSStates} from 'utils/constants';

import Search from './search';
import type {StateProps, DispatchProps, OwnProps} from './types';

function mapStateToProps(state: GlobalState) {
    const rhsState = getRhsState(state);
    const currentChannel = getCurrentChannel(state);
    const isMobileView = getIsMobileView(state);
    const isRhsOpen = getIsRhsOpen(state);

    return {
        currentChannel,
        isRhsExpanded: getIsRhsExpanded(state),
        isRhsOpen,
        isSearchingTerm: getIsSearchingTerm(state),
        searchTerms: getSearchTerms(state),
        searchType: getSearchType(state),
        searchVisible: Boolean(rhsState) && (rhsState !== RHSStates.PLUGIN && rhsState !== RHSStates.CHANNEL_INFO),
        hideMobileSearchBarInRHS: isMobileView && isRhsOpen && rhsState === RHSStates.CHANNEL_INFO,
        isMentionSearch: rhsState === RHSStates.MENTION,
        isFlaggedPosts: rhsState === RHSStates.FLAG,
        isPinnedPosts: rhsState === RHSStates.PIN,
        isChannelFiles: rhsState === RHSStates.CHANNEL_FILES,
        isMobileView,
    };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
    return {
        actions: bindActionCreators({
            updateSearchTerms,
            updateSearchTermsForShortcut,
            updateSearchType,
            showSearchResults,
            showChannelFiles,
            showMentions,
            showFlaggedPosts,
            setRhsExpanded,
            closeRightHandSide,
            autocompleteChannelsForSearch,
            autocompleteUsersInTeam,
            updateRhsState,
            getMorePostsForSearch,
            openRHSSearch,
            getMoreFilesForSearch,
            filterFilesSearchByExt,
        }, dispatch),
    };
}

export default connect<StateProps, DispatchProps, OwnProps, GlobalState>(mapStateToProps, mapDispatchToProps)(Search);
