// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {connect} from 'react-redux';

import {Permissions} from 'matterfoss-redux/constants';
import {getChannelsNameMapInCurrentTeam} from 'matterfoss-redux/selectors/entities/channels';
import {getLicense, getConfig} from 'matterfoss-redux/selectors/entities/general';
import {haveITeamPermission} from 'matterfoss-redux/selectors/entities/roles';
import {getCurrentTeam} from 'matterfoss-redux/selectors/entities/teams';

import Constants from 'utils/constants';
import {GlobalState} from 'types/store';

import TutorialView from './tutorial_view';

function mapStateToProps(state: GlobalState) {
    const license = getLicense(state);
    const config = getConfig(state);

    const team = getCurrentTeam(state);

    const teamChannels = getChannelsNameMapInCurrentTeam(state);
    const townSquare = teamChannels[Constants.DEFAULT_CHANNEL];
    const townSquareDisplayName = townSquare ? townSquare.display_name : Constants.DEFAULT_CHANNEL_UI_NAME;

    const appDownloadLink = config.AppDownloadLink;
    const isLicensed = license.IsLicensed === 'true';
    const restrictTeamInvite = !haveITeamPermission(state, {team: team.id, permission: Permissions.INVITE_USER});
    const supportEmail = config.SupportEmail;

    return {
        townSquareDisplayName,
        appDownloadLink,
        isLicensed,
        restrictTeamInvite,
        supportEmail,
    };
}

export default connect(mapStateToProps)(TutorialView);
