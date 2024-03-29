// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {switchLdapToEmail} from 'matterfoss-redux/actions/users';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';
import {GlobalState} from 'matterfoss-redux/types/store';
import {GenericAction} from 'matterfoss-redux/types/actions';

import {getPasswordConfig} from 'utils/utils.jsx';

import ClaimController from './claim_controller';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);
    const siteName = config.SiteName as string;
    const ldapLoginFieldName = config.LdapLoginFieldName as string;

    return {
        siteName,
        ldapLoginFieldName,
        passwordConfig: getPasswordConfig(config),
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            switchLdapToEmail,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClaimController);
