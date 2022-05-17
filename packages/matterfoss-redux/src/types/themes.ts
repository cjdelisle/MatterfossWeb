// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export type LegacyThemeKey = 'default' | 'organization' | 'matterfossDark' | 'windows10';

export type ThemeKey = 'pktlight' | 'pktdark' | 'denim' | 'sapphire' | 'quartz' | 'indigo' | 'onyx';

export type LegacyThemeType = 'MatterFOSS' | 'Organization' | 'MatterFOSS Dark' | 'Windows Dark';

export type ThemeType = 'PktLight' | 'PktDark' | 'Denim' | 'Sapphire' | 'Quartz' | 'Indigo' | 'Onyx';

export type Theme = {
    [key: string]: string | undefined;
    type?: ThemeType | 'custom';
    sidebarBg: string;
    sidebarText: string;
    sidebarUnreadText: string;
    sidebarTextHoverBg: string;
    sidebarTextActiveBorder: string;
    sidebarTextActiveColor: string;
    sidebarHeaderBg: string;
    sidebarTeamBarBg: string;
    sidebarHeaderTextColor: string;
    onlineIndicator: string;
    awayIndicator: string;
    dndIndicator: string;
    mentionBg: string;
    mentionBj: string;
    mentionColor: string;
    centerChannelBg: string;
    centerChannelColor: string;
    newMessageSeparator: string;
    linkColor: string;
    buttonBg: string;
    buttonColor: string;
    errorTextColor: string;
    mentionHighlightBg: string;
    mentionHighlightLink: string;
    codeTheme: string;
};

export type ThemeTypeMap = Record<ThemeType | LegacyThemeType, ThemeKey>;
