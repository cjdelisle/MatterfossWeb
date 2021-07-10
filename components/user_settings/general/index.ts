// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

import {
    getMe,
    updateMe,
    sendVerificationEmail,
    setDefaultProfileImage,
    uploadProfileImage,
} from 'matterfoss-redux/actions/users';
import {clearErrors, logError} from 'matterfoss-redux/actions/errors';
import {getConfig} from 'matterfoss-redux/selectors/entities/general';

import {GlobalState} from 'matterfoss-redux/types/store';
import {ActionFunc} from 'matterfoss-redux/types/actions';

import UserSettingsGeneralTab, {Props} from './user_settings_general';

function mapStateToProps(state: GlobalState) {
    const config = getConfig(state);

    const requireEmailVerification = config.RequireEmailVerification === 'true';
    const maxFileSize = parseInt(config.MaxFileSize!, 10);
    const ldapFirstNameAttributeSet = config.LdapFirstNameAttributeSet === 'true';
    const ldapLastNameAttributeSet = config.LdapLastNameAttributeSet === 'true';
    const samlFirstNameAttributeSet = config.SamlFirstNameAttributeSet === 'true';
    const samlLastNameAttributeSet = config.SamlLastNameAttributeSet === 'true';
    const ldapNicknameAttributeSet = config.LdapNicknameAttributeSet === 'true';
    const samlNicknameAttributeSet = config.SamlNicknameAttributeSet === 'true';
    const samlPositionAttributeSet = config.SamlPositionAttributeSet === 'true';
    const ldapPositionAttributeSet = config.LdapPositionAttributeSet === 'true';
    const ldapPictureAttributeSet = config.LdapPictureAttributeSet === 'true';

    return {
        requireEmailVerification,
        maxFileSize,
        ldapFirstNameAttributeSet,
        ldapLastNameAttributeSet,
        samlFirstNameAttributeSet,
        samlLastNameAttributeSet,
        ldapNicknameAttributeSet,
        samlNicknameAttributeSet,
        samlPositionAttributeSet,
        ldapPositionAttributeSet,
        ldapPictureAttributeSet,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        actions: bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Props['actions']>({
            logError,
            clearErrors,
            getMe,
            updateMe,
            sendVerificationEmail,
            setDefaultProfileImage,
            uploadProfileImage,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsGeneralTab);
