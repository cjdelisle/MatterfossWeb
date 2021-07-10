// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {getAssociatedGroupsForReference} from 'matterfoss-redux/selectors/entities/groups';
import {getLicense} from 'matterfoss-redux/selectors/entities/general';
import {getCurrentTeamId} from 'matterfoss-redux/selectors/entities/teams';
import {makeGetProfilesForThread} from 'matterfoss-redux/selectors/entities/posts';

import {haveIChannelPermission} from 'matterfoss-redux/selectors/entities/roles';
import Permissions from 'matterfoss-redux/constants/permissions';

import {getCurrentUserId, makeGetProfilesInChannel} from 'matterfoss-redux/selectors/entities/users';
import {makeAddLastViewAtToProfiles} from 'matterfoss-redux/selectors/entities/utils';

import {GlobalState} from 'matterfoss-redux/types/store';
import {GenericAction} from 'matterfoss-redux/types/actions';

import {autocompleteUsersInChannel} from 'actions/views/channel';
import {searchAssociatedGroupsForReference} from 'actions/views/group';
import {autocompleteChannels} from 'actions/channel_actions';

import Textbox from './textbox';

type Props = {
    channelId: string;
    rootId: string;
};

/* eslint-disable camelcase */

const getProfilesInChannelOptions = {active: true};

const makeMapStateToProps = () => {
    const getProfilesInChannel = makeGetProfilesInChannel();
    const addLastViewAtToProfiles = makeAddLastViewAtToProfiles();
    const getProfilesForThread = makeGetProfilesForThread();
    return (state: GlobalState, ownProps: Props) => {
        const teamId = getCurrentTeamId(state);
        const license = getLicense(state);
        const useGroupMentions = license?.IsLicensed === 'true' && license?.LDAPGroups === 'true' && haveIChannelPermission(state, {
            channel: ownProps.channelId,
            team: teamId,
            permission: Permissions.USE_GROUP_MENTIONS,
        });
        const autocompleteGroups = useGroupMentions ? getAssociatedGroupsForReference(state, teamId, ownProps.channelId) : null;
        const profilesInChannel = getProfilesInChannel(state, ownProps.channelId, getProfilesInChannelOptions);
        const profilesWithLastViewAtInChannel = addLastViewAtToProfiles(state, profilesInChannel);

        return {
            currentUserId: getCurrentUserId(state),
            currentTeamId: teamId,
            profilesInChannel: profilesWithLastViewAtInChannel,
            autocompleteGroups,
            priorityProfiles: getProfilesForThread(state, ownProps),
        };
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GenericAction>) => ({
    actions: bindActionCreators({
        autocompleteUsersInChannel,
        autocompleteChannels,
        searchAssociatedGroupsForReference,
    }, dispatch),
});

export default connect(makeMapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Textbox);
