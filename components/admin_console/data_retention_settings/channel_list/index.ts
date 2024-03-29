// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {getDataRetentionCustomPolicyChannels, searchDataRetentionCustomPolicyChannels as searchChannels} from 'matterfoss-redux/actions/admin';
import {filterChannelList, getChannelsInPolicy, searchChannelsInPolicy} from 'matterfoss-redux/selectors/entities/channels';
import {getDataRetentionCustomPolicy} from 'matterfoss-redux/selectors/entities/admin';
import {filterChannelsMatchingTerm, channelListToMap} from 'matterfoss-redux/utils/channel_utils';

import {ActionFunc, ActionResult, GenericAction} from 'matterfoss-redux/types/actions';

import {Channel, ChannelSearchOpts, ChannelWithTeamData} from 'matterfoss-redux/types/channels';

import {GlobalState} from 'types/store';

import {setChannelListSearch, setChannelListFilters} from 'actions/views/search';
import {DataRetentionCustomPolicy} from 'matterfoss-redux/types/data_retention';

import ChannelList from './channel_list';

type OwnProps = {
    policyId?: string;
    channelsToAdd: Record<string, ChannelWithTeamData>;
}

type Actions = {
    searchChannels: (id: string, term: string, opts: ChannelSearchOpts) => Promise<{ data: ChannelWithTeamData[] }>;
    getDataRetentionCustomPolicyChannels: (id: string, page: number, perPage: number) => Promise<{ data: ChannelWithTeamData[] }>;
    setChannelListSearch: (term: string) => ActionResult;
    setChannelListFilters: (filters: ChannelSearchOpts) => ActionResult;
}

function searchChannelsToAdd(channels: Record<string, Channel>, term: string, filters: ChannelSearchOpts): Record<string, Channel> {
    let filteredTeams = filterChannelsMatchingTerm(Object.keys(channels).map((key) => channels[key]), term);
    filteredTeams = filterChannelList(filteredTeams, filters);
    return channelListToMap(filteredTeams);
}

function mapStateToProps() {
    const getPolicyChannels = getChannelsInPolicy();
    return (state: GlobalState, ownProps: OwnProps) => {
        let {channelsToAdd} = ownProps;

        let channels: ChannelWithTeamData[] = [];
        let totalCount = 0;
        const policyId = ownProps.policyId;
        const policy = policyId ? getDataRetentionCustomPolicy(state, policyId) : {} as DataRetentionCustomPolicy;
        const searchTerm = state.views.search.channelListSearch.term || '';
        const filters = state.views.search.channelListSearch?.filters || {};

        if (searchTerm || (filters && Object.keys(filters).length !== 0)) {
            channels = policyId ? searchChannelsInPolicy(state, policyId, searchTerm, filters) as ChannelWithTeamData[] : [];
            channelsToAdd = searchChannelsToAdd(channelsToAdd, searchTerm, filters) as Record<string, ChannelWithTeamData>;
            totalCount = channels.length;
        } else {
            channels = policyId ? getPolicyChannels(state, {policyId}) as ChannelWithTeamData[] : [];
            if (policy?.channel_count) {
                totalCount = policy.channel_count;
            }
        }
        return {
            channels,
            totalCount,
            searchTerm,
            channelsToAdd,
            filters,
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc | GenericAction>, Actions>({
            getDataRetentionCustomPolicyChannels,
            searchChannels,
            setChannelListSearch,
            setChannelListFilters,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
