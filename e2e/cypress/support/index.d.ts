// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/// <reference types="cypress" />

declare namespace Cypress {
    type AdminConfig = import('matterfoss-redux/types/config').AdminConfig;
    type AnalyticsRow = import('matterfoss-redux/types/admin').AnalyticsRow;
    type Bot = import('matterfoss-redux/types/bots').Bot;
    type BotPatch = import('matterfoss-redux/types/bots').BotPatch;
    type Channel = import('matterfoss-redux/types/channels').Channel;
    type Client = import('./client-impl').E2EClient;
    type ClientLicense = import('matterfoss-redux/types/config').ClientLicense;
    type ChannelMembership = import('matterfoss-redux/types/channels').ChannelMembership;
    type ChannelType = import('matterfoss-redux/types/channels').ChannelType;
    type IncomingWebhook = import('matterfoss-redux/types/integrations').IncomingWebhook;
    type OutgoingWebhook = import('matterfoss-redux/types/integrations').OutgoingWebhook;
    type Permissions = string[];
    type PluginManifest = import('matterfoss-redux/types/plugins').PluginManifest;
    type PluginsResponse = import('matterfoss-redux/types/plugins').PluginsResponse;
    type PreferenceType = import('matterfoss-redux/types/preferences').PreferenceType;
    type Role = import('matterfoss-redux/types/roles').Role;
    type Scheme = import('matterfoss-redux/types/schemes').Scheme;
    type Session = import('matterfoss-redux/types/sessions').Session;
    type Team = import('matterfoss-redux/types/teams').Team;
    type TeamMembership = import('matterfoss-redux/types/teams').TeamMembership;
    type TermsOfService = import('matterfoss-redux/types/terms_of_service').TermsOfService;
    type UserProfile = import('matterfoss-redux/types/users').UserProfile;
    type UserStatus = import('matterfoss-redux/types/users').UserStatus;
    type UserCustomStatus = import('matterfoss-redux/types/users').UserCustomStatus;
    type UserAccessToken = import('matterfoss-redux/types/users').UserAccessToken;
}
