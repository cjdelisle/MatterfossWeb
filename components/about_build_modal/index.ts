// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getConfig, getLicense} from 'matterfoss-redux/selectors/entities/general';

import {GlobalState} from 'types/store';

import AboutBuildModal from './about_build_modal';

function mapStateToProps(state: GlobalState) {
    return {
        config: getConfig(state),
        license: getLicense(state),
    };
}

export default connect(mapStateToProps)(AboutBuildModal);
