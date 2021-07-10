// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable @typescript-eslint/naming-convention */

import {connect} from 'react-redux';

import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {getDataRetentionCustomPolicies as fetchDataRetentionCustomPolicies, deleteDataRetentionCustomPolicy, updateConfig} from 'matterfoss-redux/actions/admin';
import {getDataRetentionCustomPolicies, getDataRetentionCustomPoliciesCount} from 'matterfoss-redux/selectors/entities/admin';
import {GenericAction, ActionFunc, ActionResult} from 'matterfoss-redux/types/actions';
import {DataRetentionCustomPolicies} from 'matterfoss-redux/types/data_retention';
import {createJob, getJobsByType} from 'matterfoss-redux/actions/jobs';

import {GlobalState} from 'types/store';

import {JobTypeBase, JobType} from 'matterfoss-redux/types/jobs';

import DataRetentionSettings from './data_retention_settings';

type Actions = {
    getDataRetentionCustomPolicies: () => Promise<{ data: DataRetentionCustomPolicies}>;
    deleteDataRetentionCustomPolicy: (id: string) => Promise<ActionResult>;
    createJob: (job: JobTypeBase) => Promise<{ data: any}>;
    getJobsByType: (job: JobType) => Promise<{ data: any}>;
    updateConfig: (config: Record<string, any>) => Promise<{ data: any}>;
};

function mapStateToProps(state: GlobalState) {
    const customPolicies = getDataRetentionCustomPolicies(state);
    const customPoliciesCount = getDataRetentionCustomPoliciesCount(state);

    return {
        customPolicies,
        customPoliciesCount,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getDataRetentionCustomPolicies: fetchDataRetentionCustomPolicies,
            createJob,
            getJobsByType,
            deleteDataRetentionCustomPolicy,
            updateConfig,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataRetentionSettings);
