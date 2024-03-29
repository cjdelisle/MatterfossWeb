// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {getJobsByType, createJob, cancelJob} from 'matterfoss-redux/actions/jobs';
import {getConfig} from 'matterfoss-redux/selectors/entities/admin';
import {makeGetJobsByType} from 'matterfoss-redux/selectors/entities/jobs';
import {GenericAction, ActionFunc, ActionResult} from 'matterfoss-redux/types/actions';
import {JobType} from 'matterfoss-redux/types/jobs';

import {GlobalState} from 'types/store';

import Table, {Props} from './table';

type OwnProps = Omit<Props, 'actions'|'jobs'|'downloadExportRresults'>;

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    return {
        jobs: makeGetJobsByType(ownProps.jobType)(state),
        downloadExportResults: getConfig(state).MessageExportSettings?.DownloadExportResults,
    };
}

type Actions = {
    getJobsByType: (type: JobType) => Promise<ActionResult>;
    createJob: (job: {type: JobType}) => Promise<ActionResult>;
    cancelJob: (id: string) => Promise<ActionResult>;
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getJobsByType,
            createJob,
            cancelJob,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
