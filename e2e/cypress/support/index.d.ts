// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/// <reference types="cypress" />

declare namespace Cypress {
    type AdminConfig = import('matterfoss-redux/types/config').AdminConfig;
    type AnalyticsRow = import('matterfoss-redux/types/admin').AnalyticsRow;
    type Bot = import('matterfoss-redux/types/bots').Bot;
    type Channel = import('matterfoss-redux/types/channels').Channel;
    type ClientLicense = import('matterfoss-redux/types/config').ClientLicense;
    type ChannelMembership = import('matterfoss-redux/types/channels').ChannelMembership;
    type ChannelType = import('matterfoss-redux/types/channels').ChannelType;
    type PreferenceType = import('matterfoss-redux/types/preferences').PreferenceType;
    type Team = import('matterfoss-redux/types/teams').Team;
    type TeamMembership = import('matterfoss-redux/types/teams').TeamMembership;
    type UserProfile = import('matterfoss-redux/types/users').UserProfile;
    type UserStatus = import('matterfoss-redux/types/users').UserStatus;
}
