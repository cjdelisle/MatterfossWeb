// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

import {GenericAction, ActionFunc} from 'matterfoss-redux/types/actions';
import {TermsOfService} from 'matterfoss-redux/types/terms_of_service';
import {getTermsOfService, createTermsOfService} from 'matterfoss-redux/actions/users';

import CustomTermsOfServiceSettings from './custom_terms_of_service_settings';

type Actions = {
    getTermsOfService: () => Promise<{data: TermsOfService}>;
    createTermsOfService: (text: string) => Promise<{data: TermsOfService; error?: Error}>;
};

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getTermsOfService,
            createTermsOfService,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(CustomTermsOfServiceSettings);
