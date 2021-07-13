// Copyright (c) 2015-present MatterFOSS All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable react/no-string-refs */

import PropTypes from 'prop-types';
import React from 'react';
import {FormattedDate, FormattedTime, FormattedMessage} from 'react-intl';

import * as Utils from 'utils/utils.jsx';
import {isLicenseExpired, isLicenseExpiring, isTrialLicense} from 'utils/license_utils.jsx';
import {format} from 'utils/markdown';

import * as AdminActions from 'actions/admin_actions.jsx';
import {trackEvent} from 'actions/telemetry_actions';

import FormattedMarkdownMessage from 'components/formatted_markdown_message.jsx';
import FormattedAdminHeader from 'components/widgets/admin_console/formatted_admin_header';
import LoadingWrapper from 'components/widgets/loading/loading_wrapper';

import RenewLinkCard from './renew_license_card/renew_license_card';
import TrialLicenseCard from './trial_license_card/trial_license_card';

export default class LicenseSettings extends React.PureComponent {
    static propTypes = {
        license: PropTypes.object.isRequired,
        enterpriseReady: PropTypes.bool.isRequired,
        upgradedFromTE: PropTypes.bool.isRequired,
        stats: PropTypes.object,
        config: PropTypes.object,
        isDisabled: PropTypes.bool,
        actions: PropTypes.shape({
            getLicenseConfig: PropTypes.func.isRequired,
            uploadLicense: PropTypes.func.isRequired,
            removeLicense: PropTypes.func.isRequired,
            upgradeToE0: PropTypes.func.isRequired,
            restartServer: PropTypes.func.isRequired,
            ping: PropTypes.func.isRequired,
            upgradeToE0Status: PropTypes.func.isRequired,
            requestTrialLicense: PropTypes.func.isRequired,
        }).isRequired,
    }

    constructor(props) {
        super(props);

        this.interval = null;
        this.state = {
            fileSelected: false,
            fileName: null,
            serverError: null,
            gettingTrialError: null,
            gettingTrial: false,
            removing: false,
            uploading: false,
            upgradingPercentage: 0,
            upgradeError: null,
            restarting: false,
            restartError: null,
        };

        this.fileInputRef = React.createRef();
    }

    componentDidMount() {
        if (!this.props.enterpriseReady) {
            this.reloadPercentage();
        }
        this.props.actions.getLicenseConfig();
        AdminActions.getStandardAnalytics();
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    reloadPercentage = async () => {
        const {percentage, error} = await this.props.actions.upgradeToE0Status();
        if (percentage === 100 || error) {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
                if (error) {
                    trackEvent('api', 'upgrade_to_e0_failed', {error});
                } else {
                    trackEvent('api', 'upgrade_to_e0_success');
                }
            }
        } else if (percentage > 0 && !this.interval) {
            this.interval = setInterval(this.reloadPercentage, 2000);
        }
        this.setState({upgradingPercentage: percentage || 0, upgradeError: error});
    }

    handleChange = () => {
        const element = this.fileInputRef.current;
        if (element && element.files.length > 0) {
            this.setState({fileSelected: true, fileName: element.files[0].name});
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const element = this.fileInputRef.current;
        if (!element || element.files.length === 0) {
            return;
        }
        const file = element.files[0];

        this.setState({uploading: true});

        const {error} = await this.props.actions.uploadLicense(file);
        if (error) {
            Utils.clearFileInput(element[0]);
            this.setState({fileSelected: false, fileName: null, serverError: error.message, uploading: false});
            return;
        }

        await this.props.actions.getLicenseConfig();
        this.setState({fileSelected: false, fileName: null, serverError: null, uploading: false});
    }

    handleRemove = async (e) => {
        e.preventDefault();

        this.setState({removing: true});

        const {error} = await this.props.actions.removeLicense();
        if (error) {
            this.setState({fileSelected: false, fileName: null, serverError: error.message, removing: false});
            return;
        }

        await this.props.actions.getLicenseConfig();
        this.setState({fileSelected: false, fileName: null, serverError: null, removing: false});
    }

    handleUpgrade = async (e) => {
        e.preventDefault();
        if (this.state.upgradingPercentage > 0) {
            return;
        }
        try {
            await this.props.actions.upgradeToE0();
            this.setState({upgradingPercetage: 1});
            await this.reloadPercentage();
        } catch (error) {
            trackEvent('api', 'upgrade_to_e0_failed', {error: error.message});
            this.setState({upgradeError: error.message, upgradingPercetage: 0});
        }
    }

    requestLicense = async (e) => {
        e.preventDefault();
        if (this.state.gettingTrial) {
            return;
        }
        this.setState({gettingTrial: true, gettingTrialError: null});
        const requestedUsers = Math.max(this.props.stats.TOTAL_USERS, 30);
        const {error} = await this.props.actions.requestTrialLicense(requestedUsers, true, true, 'license');
        if (error) {
            this.setState({gettingTrialError: error});
        }
        this.setState({gettingTrial: false});
        this.props.actions.getLicenseConfig();
    }

    checkRestarted = () => {
        this.props.actions.ping().then(() => {
            window.location.reload();
        }).catch(() => {
            setTimeout(this.checkRestarted, 1000);
        });
    }

    handleRestart = async (e) => {
        e.preventDefault();
        this.setState({restarting: true});
        try {
            await this.props.actions.restartServer();
        } catch (err) {
            this.setState({restarting: false, restartError: err});
        }
        setTimeout(this.checkRestarted, 1000);
    }

    render() {
        let gettingTrialError = '';
        if (this.state.gettingTrialError) {
            gettingTrialError = (
                <p className='trial-error'>
                    <FormattedMarkdownMessage
                        id='admin.license.trial-request.error'
                        defaultMessage='Trial license could not be retrieved. Visit [https://mattermost.com/trial/](https://mattermost.com/trial/) to request a license.'
                    />
                </p>
            );
        }

        const {license, upgradedFromTE, isDisabled} = this.props;
        const {uploading} = this.state;

        let edition;
        let licenseType;
        let licenseContent;
        let eelicense;

        const issued = (
            <React.Fragment>
                <FormattedDate value={new Date(parseInt(license.IssuedAt, 10))}/>
                {' '}
                <FormattedTime value={new Date(parseInt(license.IssuedAt, 10))}/>
            </React.Fragment>
        );
        const startsAt = <FormattedDate value={new Date(parseInt(license.StartsAt, 10))}/>;
        const expiresAt = <FormattedDate value={new Date(parseInt(license.ExpiresAt, 10))}/>;

        if (!this.props.enterpriseReady) { // Team Edition
            // Note: DO NOT LOCALISE THESE STRINGS. Legally we can not since the license is in English.
            edition = (
                <div>
                    <p>{'MatterFOSS.'}</p>
                </div>
            );

            licenseType = (
                <div>
                    <p>
                        {'This software is offered under the GNU Affero GPL 3.0. ' +
                        'You are reminded that under the terms of the AGPL, providing a ' +
                        'this web service constitutes redistribution of the software and ' +
                        'therefore any changes that you make to the software must be made ' +
                        'available to your users in source code form.'}
                    </p>
                    <p>{''}</p>
                    <p>{'See NOTICE.txt for information about open source software used in the system.'}</p>
                </div>
            );

            eelicense = this.renderEELicenseText();
        } else if (license.IsLicensed === 'true' && !uploading) {
            edition = 'MatterFOSS - Licensed under the AGPL';
            licenseType = (
                <div>
                    <p>
                        {'This software is offered under the GNU Affero GPL 3.0. ' +
                        'You are reminded that under the terms of the AGPL, providing a ' +
                        'this web service constitutes redistribution of the software and ' +
                        'therefore any changes that you make to the software must be made ' +
                        'available to your users in source code form.'}
                    </p>
                    <br/>
                    {'See also: '}
                    <a
                        rel='noopener noreferrer'
                        target='_blank'
                        href='https://www.gnu.org/licenses/agpl-3.0.en.html'
                    >{'AGPL License text'}</a>
                </div>
            );

            let skuShortName = license.SkuShortName;
            if (isTrialLicense(license)) {
                skuShortName = `${license.SkuShortName} Trial`;
            }

            // Note: DO NOT LOCALISE THESE STRINGS. Legally we can not since the license is in English.
            edition = 'MatterFOSS - Licensed under the AGPL';
            if (upgradedFromTE) {
                eelicense = this.renderEELicenseText();
            }
            licenseType = (
                <div>
                    {!upgradedFromTE &&
                        <p>
                            {'This software is offered under the GNU Affero GPL 3.0. ' +
                            'You are reminded that under the terms of the AGPL, providing a ' +
                            'this web service constitutes redistribution of the software and ' +
                            'therefore any changes that you make to the software must be made ' +
                            'available to your users in source code form.'}
                        </p>}
                        <br/>
                        {'See also: '}
                        <a
                            rel='noopener noreferrer'
                            target='_blank'
                            href='https://www.gnu.org/licenses/agpl-3.0.en.html'
                        >{'AGPL License text'}</a>
                </div>
            );
            licenseContent = this.renderE10E20Content();
        } else {
            // Note: DO NOT LOCALISE THESE STRINGS. Legally we can not since the license is in English.
            edition = (
                <div>
                    {'MatterFOSS.'}
                    <p className='trial'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={this.requestLicense}
                            disabled={isDisabled}
                        >
                            <LoadingWrapper
                                loading={this.state.gettingTrial}
                                text={Utils.localizeMessage('admin.license.trial-request.loading', 'Getting trial')}
                            >
                                <FormattedMessage
                                    id='admin.license.trial-request.submit'
                                    defaultMessage='Start trial'
                                />
                            </LoadingWrapper>
                        </button>
                    </p>
                    {gettingTrialError}
                    <p className='trial-legal-terms'>
                        <FormattedMarkdownMessage
                            id='admin.license.trial-request.accept-terms'
                            defaultMessage='By clicking **Start trial**, I agree to the [MatterFOSS Software Evaluation Agreement](!https://mattermost.com/software-evaluation-agreement/), [Privacy Policy](!https://mattermost.com/privacy-policy/), and receiving product emails.'
                        />
                    </p>
                </div>
            );

            if (upgradedFromTE) {
                licenseType = (
                    <div>
                        <p>{''}</p>
                        <p>{'See NOTICE.txt for information about open source software used in the system.'}</p>
                    </div>
                );
                eelicense = this.renderEELicenseText();
            } else {
                licenseType = 'This software is offered under the GNU Affero GPL 3.0. You are reminded that under the terms of the AGPL, providing a this web service constitutes redistribution of the software and therefore any changes that you make to the software must be made available to your users in source code form.';
            }

            licenseContent = this.renderE0Content();
        }

        return (
            <div className='wrapper--fixed'>
                <FormattedAdminHeader
                    id='admin.license.title'
                    defaultMessage='Edition and License'
                />

                <div className='admin-console__wrapper'>
                    <div className='admin-console__content'>
                        <form
                            className='form-horizontal'
                            role='form'
                        >
                            {this.renewLicenseCard()}
                            <div className='form-group'>
                                <label
                                    className='control-label col-sm-4'
                                >
                                    <FormattedMessage
                                        id='admin.license.edition'
                                        defaultMessage='Edition: '
                                    />
                                </label>
                                <div className='col-sm-8'>
                                    {edition}
                                </div>
                            </div>
                            <div className='form-group'>
                                <label
                                    className='control-label col-sm-4'
                                >
                                    <FormattedMessage
                                        id='admin.license.type'
                                        defaultMessage='License: '
                                    />
                                </label>
                                <div className='col-sm-8'>
                                    {licenseType}
                                </div>
                            </div>
                            {licenseContent &&
                                <div className='form-group'>
                                    {licenseContent}
                                </div>}
                            {eelicense &&
                                <div className='form-group'>
                                    {eelicense}
                                </div>}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    renderE10E20Content = () => {
        let removeButtonText = (
            <FormattedMessage
                id='admin.license.keyRemove'
                defaultMessage='Remove Enterprise License and Downgrade Server'
            />
        );
        if (this.state.removing) {
            removeButtonText = (
                <FormattedMessage
                    id='admin.license.removing'
                    defaultMessage='Removing License...'
                />
            );
        }

        return (
            <>
            </>
        );
    }

    renderE0Content = () => {
        let serverError = '';
        if (this.state.serverError) {
            serverError = <div className='col-sm-12'><div className='form-group has-error'><label className='control-label'>{this.state.serverError}</label></div></div>;
        }

        var btnClass = 'btn';
        if (this.state.fileSelected) {
            btnClass = 'btn btn-primary';
        }

        let fileName;
        if (this.state.fileName) {
            fileName = this.state.fileName;
        } else {
            fileName = (
                <FormattedMessage
                    id='admin.license.noFile'
                    defaultMessage='No file uploaded'
                />
            );
        }

        let uploadButtonText = (
            <FormattedMessage
                id='admin.license.upload'
                defaultMessage='Upload'
            />
        );
        if (this.state.uploading) {
            uploadButtonText = (
                <FormattedMessage
                    id='admin.license.uploading'
                    defaultMessage='Uploading License...'
                />
            );
        }
        return (
            <>
                <label
                    className='control-label col-sm-4'
                >
                    <FormattedMessage
                        id='admin.license.key'
                        defaultMessage='License Key: '
                    />
                </label>
                <div className='col-sm-8'>
                    <div className='file__upload'>
                        <button
                            type='button'
                            className='btn btn-primary'
                        >
                            <FormattedMessage
                                id='admin.license.choose'
                                defaultMessage='Choose File'
                            />
                        </button>
                        <input
                            ref={this.fileInputRef}
                            type='file'
                            accept='.mattermost-license'
                            onChange={this.handleChange}
                            disabled={this.props.isDisabled}
                        />
                    </div>
                    <button
                        className={btnClass}
                        disabled={this.props.isDisabled || !this.state.fileSelected}
                        onClick={this.handleSubmit}
                        id='upload-button'
                    >
                        {uploadButtonText}
                    </button>
                    <div className='help-text m-0'>
                        {fileName}
                    </div>
                    <br/>
                    {serverError}
                    <p className='help-text m-0'>
                        <FormattedMarkdownMessage
                            id='admin.license.uploadDesc'
                            defaultMessage='Upload a license key for MatterFOSS to upgrade this server. [Visit us online](!http://mattermost.com) to learn more about the benefits of Enterprise Edition or to purchase a key.'
                        />
                    </p>
                </div>
            </>
        );
    }

    renderEELicenseText = () => {
        return (
            <>
            </>
        );
    }

    renewLicenseCard = () => {
        const {isDisabled} = this.props;
        if (isTrialLicense(this.props.license)) {
            return (
                <TrialLicenseCard
                    license={this.props.license}
                />
            );
        }
        if (isLicenseExpired(this.props.license) || isLicenseExpiring(this.props.license)) {
            return (
                <RenewLinkCard
                    license={this.props.license}
                    isLicenseExpired={isLicenseExpired(this.props.license)}
                    totalUsers={this.props.stats.TOTAL_USERS}
                    isDisabled={isDisabled}
                />
            );
        }
        return null;
    }
}
/* eslint-enable react/no-string-refs */
