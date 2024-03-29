// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {ComponentProps} from 'react';
import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getCurrentUser, getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {appsEnabled, makeGetPostOptionBinding} from 'matterfoss-redux/selectors/entities/apps';

import {AppBindingLocations} from 'matterfoss-redux/constants/apps';

import {isSystemAdmin} from 'matterfoss-redux/utils/user_utils';
import {isSystemMessage} from 'matterfoss-redux/utils/post_utils';
import {isCombinedUserActivityPost} from 'matterfoss-redux/utils/post_list';

import {GenericAction} from 'matterfoss-redux/types/actions';
import {ModalData} from 'types/actions';
import {getIsMobileView} from 'selectors/views/browser';
import {AppBinding} from 'matterfoss-redux/types/apps';
import {Post} from 'matterfoss-redux/types/posts';
import {HandleBindingClick, OpenAppsModal, PostEphemeralCallResponseForPost} from 'types/apps';
import {GlobalState} from 'types/store';

import {openModal} from 'actions/views/modals';
import {makeFetchBindings, postEphemeralCallResponseForPost, handleBindingClick, openAppsModal} from 'actions/apps';

import ActionsMenu from './actions_menu';

type Props = {
    post: Post;
    handleCardClick?: (post: Post) => void;
    handleDropdownOpened: (open: boolean) => void;
    isMenuOpen: boolean;
    location?: ComponentProps<typeof ActionsMenu>['location'];
};

const emptyBindings: AppBinding[] = [];

const getPostOptionBinding = makeGetPostOptionBinding();

const fetchBindings = makeFetchBindings(AppBindingLocations.POST_MENU_ITEM);

function mapStateToProps(state: GlobalState, ownProps: Props) {
    const {post} = ownProps;

    const userId = getCurrentUserId(state);
    const systemMessage = isSystemMessage(post);

    const apps = appsEnabled(state);
    const showBindings = apps && !systemMessage && !isCombinedUserActivityPost(post.id);
    let appBindings: AppBinding[] | null = emptyBindings;
    if (showBindings) {
        appBindings = getPostOptionBinding(state, ownProps.location);
    }
    const currentUser = getCurrentUser(state);
    const isSysAdmin = isSystemAdmin(currentUser.roles);

    return {
        appBindings,
        appsEnabled: apps,
        components: state.plugins.components,
        isSysAdmin,
        pluginMenuItems: state.plugins.components.PostDropdownMenu,
        teamId: getCurrentTeamId(state),
        userId,
        isMobileView: getIsMobileView(state),
    };
}

type Actions = {
    handleBindingClick: HandleBindingClick;
    fetchBindings: (userId: string, channelId: string, teamId: string) => Promise<{data: AppBinding[]}>;
    openModal: <P>(modalData: ModalData<P>) => void;
    openAppsModal: OpenAppsModal;
    postEphemeralCallResponseForPost: PostEphemeralCallResponseForPost;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<any>, Actions>({
            handleBindingClick,
            fetchBindings,
            openModal,
            openAppsModal,
            postEphemeralCallResponseForPost,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsMenu);
