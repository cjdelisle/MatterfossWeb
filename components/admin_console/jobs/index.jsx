// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getJobsByType, createJob, cancelJob} from 'matterfoss-redux/actions/jobs';
import {getConfig} from 'matterfoss-redux/selectors/entities/admin';
import * as Selectors from 'matterfoss-redux/selectors/entities/jobs';

import Table from './table.jsx';

function mapStateToProps(state, ownProps) {
    return {
        jobs: Selectors.makeGetJobsByType(ownProps.jobType)(state),
        downloadExportResults: getConfig(state).MessageExportSettings.DownloadExportResults,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getJobsByType,
            createJob,
            cancelJob,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
