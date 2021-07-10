// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {getLogs} from 'matterfoss-redux/actions/admin';

import * as Selectors from 'matterfoss-redux/selectors/entities/admin';

import {GenericAction} from 'matterfoss-redux/types/actions';

import {GlobalState} from 'types/store';

import Logs from './logs';

function mapStateToProps(state: GlobalState) {
    return {
        logs: Selectors.getLogs(state),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            getLogs,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
