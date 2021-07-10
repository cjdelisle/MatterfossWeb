// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {getFilePublicLink} from 'matterfoss-redux/actions/files';
import * as Selectors from 'matterfoss-redux/selectors/entities/files';

import {GlobalState} from 'matterfoss-redux/types/store';
import {GenericAction, ActionFunc} from 'matterfoss-redux/types/actions';

import GetPublicLinkModal from './get_public_link_modal';

function mapStateToProps(state: GlobalState) {
    const filePublicLink: unknown = Selectors.getFilePublicLink(state)?.link;
    return {
        link: filePublicLink as string,
    };
}

type Actions = {
    getFilePublicLink: (code: string) => Promise<{ error: { server_error_id: string; message: string } }>;
};

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getFilePublicLink,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GetPublicLinkModal);
