// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Channel} from 'matterfoss-redux/types/channels';
import {MarketplacePlugin} from 'matterfoss-redux/types/plugins';
import {GlobalState as BaseGlobalState} from 'matterfoss-redux/types/store';

import {I18nState} from './i18n';
import {RhsViewState} from './rhs';
import {PluginsState} from './plugins';

export type DraggingState = {
    state?: string;
    type?: string;
    id?: string;
}

export type GlobalState = BaseGlobalState & {
    plugins: PluginsState;
    storage: {
        storage: {[key: string]: any};
    };

    views: {
        admin: {
            navigationBlock: {
                blocked: boolean;
                onNavigationConfirmed: () => void;
                showNavigationPrompt: boolean;
            };
        };

        browser: {
            focused: boolean;
        };

        channel: {
            postVisibility: {
                [channelId: string]: number;
            };
            lastChannelViewTime: {
                [channelId: string]: number;
            };
            loadingPost: {
                [channelId: string]: boolean;
            };
            focusedPostId: string;
            mobileView: boolean;
            keepChannelIdAsUnread: Channel | null;
            lastGetPosts: {
                [channelId: string]: number;
            };
            channelPrefetchStatus: {
                [channelId: string]: string;
            };
        };

        rhs: RhsViewState;

        posts: {
            editingPost: {
                show: boolean;
            };
            menuActions: {
                [postId: string]: {
                    [actionId: string]: {
                        text: string;
                        value: string;
                    };
                };
            };
        };

        modals: {
            [modalId: string]: {
                open: boolean;
                dialogProps: object;
                dialogType: React.Component;
            };
        };

        emoji: {
            emojiPickerCustomPage: 0;
        };

        i18n: I18nState;

        lhs: {
            isOpen: boolean;
        };

        search: {
            modalSearch: string;
            systemUsersSearch: {
                term: string;
                team: string;
                filter: string;
            };
            userGridSearch: {
                term: string;
                filters: {
                    roles?: string[];
                    channel_roles?: string[];
                    team_roles?: string[];
                };
            };
        };

        notice: {
            [noticeType: string]: boolean;
        };

        system: {
            websocketConnectErrorCount: number;
        };

        channelSelectorModal: {
            channels: Channel[];
        };

        settings: {
            activeSection: string;
            previousActiveSection: string;
        };

        marketplace: {
            plugins: MarketplacePlugin[];
            installing: {[pluginId: string]: boolean};
            errors: {[pluginId: string]: string};
            filter: string;
        };

        channelSidebar: {
            unreadFilterEnabled: boolean;
            draggingState: DraggingState;
            newCategoryIds: string[];
        };
    };
};
