// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {memo} from 'react';
import {FormattedMessage} from 'react-intl';

import crtBetaImg from 'images/crt-beta.gif';

import GenericModal from 'components/generic_modal';
import AlertBanner from 'components/alert_banner';
import FormattedMarkdownMessage from 'components/formatted_markdown_message';
import {ModalIdentifiers} from 'utils/constants';

import './collapsed_reply_threads_beta_modal.scss';

type Props = {
    onExited: () => void;
}

function CollapsedReplyThreadsBetaModal(props: Props) {
    return (
        <GenericModal
            className='CollapsedReplyThreadsBetaModal'
            id={ModalIdentifiers.COLLAPSED_REPLY_THREADS_BETA_MODAL}
            enforceFocus={false}
            onExited={props.onExited}
            modalHeaderText={(
                <FormattedMessage
                    id='collapsed_reply_threads_beta_modal.title'
                    defaultMessage={'You\'re accessing an early beta of Collapsed Reply Threads'}
                />
            )}
            confirmButtonText={(
                <FormattedMessage
                    id={'collapsed_reply_threads_beta_modal.confirm'}
                    defaultMessage='Got it'
                />
            )}
            handleConfirm={props.onExited}
        >
            <div>
                <AlertBanner
                    variant='app'
                    mode='info'
                    title={(
                        <FormattedMarkdownMessage
                            id='collapsed_reply_threads_beta_modal.banner.title'
                            defaultMessage='Please  [review the list of known issues](!https://docs.matterfoss.com/messaging/organizing-conversations.html#known-issues) as we work on stabilizing the feature.'
                        />
                    )}
                    message={(
                        <FormattedMessage
                            id='collapsed_reply_threads_beta_modal.banner.message'
                            defaultMessage='In particular, you may notice a number of channels and threads appear as unread when you enable Collapsed Reply Threads for the first time.'
                        />
                    )}
                />

                <img
                    src={crtBetaImg}
                    className='CollapsedReplyThreadsModal__img'
                />
            </div>
        </GenericModal>
    );
}

export default memo(CollapsedReplyThreadsBetaModal);
