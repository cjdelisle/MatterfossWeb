// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {createSelector} from 'reselect';

import {removeReaction} from 'matterfoss-redux/actions/posts';
import {getMissingProfilesByIds} from 'matterfoss-redux/actions/users';

import {getCustomEmojisByName} from 'matterfoss-redux/selectors/entities/emojis';
import {canAddReactions, canRemoveReactions} from 'matterfoss-redux/selectors/entities/reactions';
import {getCurrentUserId} from 'matterfoss-redux/selectors/entities/users';

import {GenericAction} from 'matterfoss-redux/types/actions';
import {Emoji as EmojiType} from 'matterfoss-redux/types/emojis';
import {Post} from 'matterfoss-redux/types/posts';
import {Reaction as ReactionType} from 'matterfoss-redux/types/reactions';
import {GlobalState} from 'matterfoss-redux/types/store';

import {getEmojiImageUrl} from 'matterfoss-redux/utils/emoji_utils';

import {addReaction} from 'actions/post_actions.jsx';

import * as Emoji from 'utils/emoji.jsx';

import Reaction from './reaction';

type Props = {
    emojiName: string;
    post: Post;
    reactions: ReactionType[];
};

function makeMapStateToProps() {
    const didCurrentUserReact = createSelector(
        'didCurrentUserReact',
        getCurrentUserId,
        (state: GlobalState, reactions: ReactionType[]) => reactions,
        (currentUserId: string, reactions: ReactionType[]) => {
            return reactions.some((reaction) => reaction.user_id === currentUserId);
        },
    );

    return function mapStateToProps(state: GlobalState, ownProps: Props) {
        const channelId = ownProps.post.channel_id;

        let emoji;
        if (Emoji.EmojiIndicesByAlias.has(ownProps.emojiName)) {
            emoji = Emoji.Emojis[Emoji.EmojiIndicesByAlias.get(ownProps.emojiName) as number];
        } else {
            const emojis = getCustomEmojisByName(state);
            emoji = emojis.get(ownProps.emojiName);
        }

        let emojiImageUrl = '';
        if (emoji) {
            emojiImageUrl = getEmojiImageUrl(emoji as EmojiType);
        }
        const currentUserId = getCurrentUserId(state);

        return {
            currentUserId,
            reactionCount: ownProps.reactions.length,
            canAddReactions: canAddReactions(state, channelId),
            canRemoveReactions: canRemoveReactions(state, channelId),
            emojiImageUrl,
            currentUserReacted: didCurrentUserReact(state, ownProps.reactions),
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            addReaction,
            removeReaction,
            getMissingProfilesByIds,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(Reaction);
