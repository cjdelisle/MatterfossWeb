// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {createSelector} from 'reselect';

import {linkLdapGroup, unlinkLdapGroup, getLdapGroups as fetchLdapGroups} from 'matterfoss-redux/actions/admin';
import {getLdapGroups, getLdapGroupsCount} from 'matterfoss-redux/selectors/entities/admin';

import {GlobalState} from 'matterfoss-redux/types/store';
import {ActionFunc} from 'matterfoss-redux/types/actions';

import GroupsList from './groups_list';

const getSortedListOfLdapGroups = createSelector(
    'getSortedListOfLdapGroups',
    getLdapGroups,
    (ldapGroups) => {
        const groups = Object.values(ldapGroups);
        groups.sort((a, b) => a.name.localeCompare(b.name));
        return groups;
    },
);

function mapStateToProps(state: GlobalState) {
    return {
        groups: getSortedListOfLdapGroups(state),
        total: getLdapGroupsCount(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, any>({
            getLdapGroups: fetchLdapGroups,
            link: linkLdapGroup,
            unlink: unlinkLdapGroup,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
