// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getTheme} from 'matterfoss-redux/selectors/entities/preferences';
import {GlobalState} from 'matterfoss-redux/types/store';

import NavigationRow from './navigation_row';

function mapStateToProps(state: GlobalState) {
    return {
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(NavigationRow);
