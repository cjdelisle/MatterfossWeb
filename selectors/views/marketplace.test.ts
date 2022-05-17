// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {AuthorType, MarketplaceApp, MarketplacePlugin, ReleaseStage} from 'matterfoss-redux/types/marketplace';

import {
    getPlugins,
    getListing,
    getInstalledListing,
    getApp,
    getPlugin,
    getFilter,
    getInstalling,
    getError,
} from 'selectors/views/marketplace';

import {GlobalState} from 'types/store';

describe('marketplace', () => {
    const samplePlugin: MarketplacePlugin = {
        homepage_url: 'https://github.com/matterfoss/matterfoss-plugin-nps',
        download_url: 'https://github.com/matterfoss/matterfoss-plugin-nps/releases/download/v1.0.3/com.matterfoss.nps-1.0.3.tar.gz',
        author_type: AuthorType.MatterFOSS,
        release_stage: ReleaseStage.Production,
        enterprise: false,
        manifest: {
            id: 'com.matterfoss.nps',
            name: 'User Satisfaction Surveys',
            description: 'This plugin sends quarterly user satisfaction surveys to gather feedback and help improve MatterFOSS',
            version: '1.0.3',
            min_server_version: '5.14.0',
        },
        installed_version: '',
    };

    const sampleInstalledPlugin: MarketplacePlugin = {
        homepage_url: 'https://github.com/matterfoss/matterfoss-test',
        download_url: 'https://github.com/matterfoss/matterfoss-test/releases/download/v1.0.3/com.matterfoss.nps-1.0.3.tar.gz',
        author_type: AuthorType.MatterFOSS,
        release_stage: ReleaseStage.Production,
        enterprise: false,
        manifest: {
            id: 'com.matterfoss.test',
            name: 'Test',
            description: 'This plugin is to test',
            version: '1.0.3',
            min_server_version: '5.14.0',
        },
        installed_version: '1.0.3',
    };

    const sampleApp: MarketplaceApp = {
        installed: false,
        author_type: AuthorType.MatterFOSS,
        release_stage: ReleaseStage.Production,
        enterprise: false,
        manifest: {
            app_id: 'some.id',
            display_name: 'Some App',
        },
    };

    const sampleInstalledApp: MarketplaceApp = {
        installed: true,
        author_type: AuthorType.MatterFOSS,
        release_stage: ReleaseStage.Production,
        enterprise: false,
        manifest: {
            app_id: 'some.other.id',
            display_name: 'Some other App',
        },
    };

    const state = {
        views: {
            marketplace: {
                plugins: [samplePlugin, sampleInstalledPlugin],
                apps: [sampleApp, sampleInstalledApp],
                installing: {'com.matterfoss.nps': true},
                errors: {'com.matterfoss.test': 'An error occurred'},
                filter: 'existing',
            },
        },
    } as unknown as GlobalState;

    it('getListing should return all plugins and apps', () => {
        expect(getListing(state)).toEqual([samplePlugin, sampleInstalledPlugin, sampleApp, sampleInstalledApp]);
    });

    it('getInstalledListing should return only installed plugins and apps', () => {
        expect(getInstalledListing(state)).toEqual([sampleInstalledPlugin, sampleInstalledApp]);
    });

    it('getPlugins should return all plugins', () => {
        expect(getPlugins(state)).toEqual([samplePlugin, sampleInstalledPlugin]);
    });

    describe('getPlugin', () => {
        it('should return samplePlugin', () => {
            expect(getPlugin(state, 'com.matterfoss.nps')).toEqual(samplePlugin);
        });

        it('should return sampleInstalledPlugin', () => {
            expect(getPlugin(state, 'com.matterfoss.test')).toEqual(sampleInstalledPlugin);
        });

        it('should return undefined for unknown plugin', () => {
            expect(getPlugin(state, 'unknown')).toBeUndefined();
        });
    });

    describe('getApp', () => {
        it('should return sampleApp', () => {
            expect(getApp(state, 'some.id')).toEqual(sampleApp);
        });

        it('should return sampleInstalledApp', () => {
            expect(getApp(state, 'some.other.id')).toEqual(sampleInstalledApp);
        });

        it('should return undefined for unknown app', () => {
            expect(getApp(state, 'unknown')).toBeUndefined();
        });
    });

    it('getFilter should return the active filter', () => {
        expect(getFilter(state)).toEqual('existing');
    });

    describe('getInstalling', () => {
        it('should return true for samplePlugin', () => {
            expect(getInstalling(state, 'com.matterfoss.nps')).toBe(true);
        });

        it('should return false for sampleInstalledPlugin', () => {
            expect(getInstalling(state, 'com.matterfoss.test')).toBe(false);
        });

        it('should return false for unknown plugin', () => {
            expect(getInstalling(state, 'unknown')).toBe(false);
        });
    });

    describe('getError', () => {
        it('should return undefined for samplePlugin', () => {
            expect(getError(state, 'com.matterfoss.nps')).toBeUndefined();
        });

        it('should return error value for sampleInstalledPlugin', () => {
            expect(getError(state, 'com.matterfoss.test')).toBe('An error occurred');
        });

        it('should return undefined for unknown plugin', () => {
            expect(getError(state, 'unknown')).toBeUndefined();
        });
    });
});
