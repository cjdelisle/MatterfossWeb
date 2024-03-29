// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Modal} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';
import classNames from 'classnames';

import FormattedMarkdownMessage from 'components/formatted_markdown_message';
import MatterFOSSLogo from 'components/widgets/icons/matterfoss_logo';

import './about_build_modal_cloud.scss';

type Props = {
    onExited: () => void;
    config: any;
    license: any;
    show: boolean;
    doHide: () => void;
};

// Webpack global var
declare const COMMIT_HASH: string;

export default function AboutBuildModalCloud(props: Props) {
    const config = props.config;
    const license = props.license;

    const title = (
        <FormattedMessage
            id='about.cloudEdition'
            defaultMessage='Cloud'
        />
    );

    const subTitle = (
        <FormattedMessage
            id='about.enterpriseEditionSst'
            defaultMessage='High trust messaging for the enterprise'
        />
    );

    const licensee = (
        <div className='form-group'>
            <FormattedMessage
                id='about.licensed'
                defaultMessage='Licensed to:'
            />
            {'\u00a0' + license.Company}
        </div>
    );

    let mmversion = config.BuildNumber;
    if (!isNaN(config.BuildNumber)) {
        mmversion = 'ci';
    }

    return (
        <Modal
            dialogClassName={classNames('a11y__modal', 'about-modal', 'cloud')}
            show={props.show}
            onHide={props.doHide}
            onExited={props.onExited}
            role='dialog'
            aria-labelledby='aboutModalLabel'
        >
            <Modal.Header closeButton={true}>
                <Modal.Title
                    componentClass='h1'
                    id='aboutModalLabel'
                >
                    <FormattedMessage
                        id='about.title'
                        values={{appTitle: config.SiteName || 'MatterFOSS'}}
                        defaultMessage='About {appTitle}'
                    />
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='about-modal__content'>
                    <div className='about-modal__logo'>
                        <MatterFOSSLogo/>
                    </div>
                    <div>
                        <h3 className='about-modal__title'>
                            <strong>{'MatterFOSS'} {title}</strong>
                        </h3>
                        <p className='subtitle'>{subTitle}</p>
                        <div className='description'>
                            <div>
                                <FormattedMessage
                                    id='about.version'
                                    defaultMessage='MatterFOSS Version:'
                                />
                                <span id='versionString'>{'\u00a0' + mmversion}</span>
                            </div>
                        </div>
                        {licensee}
                        <div className='about-footer'>
                            <FormattedMarkdownMessage
                                id='about.notice'
                                defaultMessage='MatterFOSS is made possible by the open source software used in our [server](!https://github.com/matterfoss/matterfoss-server/blob/master/NOTICE.txt), [desktop](!https://github.com/matterfoss/desktop/blob/master/NOTICE.txt) and [mobile](!https://github.com/matterfoss/matterfoss-mobile/blob/master/NOTICE.txt) apps.'
                            />
                            <div className='copy-right'>
                                <FormattedMessage
                                    id='about.copyright'
                                    defaultMessage='Copyright 2015 - {currentYear} MatterFOSS, Inc. All rights reserved'
                                    values={{
                                        currentYear: new Date().getFullYear(),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div/>
                </div>
                <div className='about-modal__hash'>
                    <p>
                        <FormattedMessage
                            id='about.hash'
                            defaultMessage='Build Hash:'
                        />
                        {config.BuildHash}
                        <br/>
                        <FormattedMessage
                            id='about.hashee'
                            defaultMessage='EE Build Hash:'
                        />
                        {config.BuildHashEnterprise}
                        <br/>
                        <FormattedMessage
                            id='about.hashwebapp'
                            defaultMessage='Webapp Build Hash:'
                        />
                        {typeof COMMIT_HASH === 'undefined' ? '' : COMMIT_HASH}
                    </p>
                    <p>
                        <FormattedMessage
                            id='about.date'
                            defaultMessage='Build Date:'
                        />
                        {config.BuildDate}
                    </p>
                </div>
            </Modal.Body>
        </Modal>
    );
}
