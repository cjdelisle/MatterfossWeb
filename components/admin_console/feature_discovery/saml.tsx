// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import {t} from 'utils/i18n';
import saml from 'images/feature-discovery/saml.png';

import FeatureDiscovery from './index';

const SAMLFeatureDiscovery: React.FC = () => {
    return (
        <FeatureDiscovery
            featureName='saml'
            titleID='admin.saml_feature_discovery.title'
            titleDefault='Integrate SAML 2.0 with MatterFOSS Enterprise E20'
            copyID='admin.saml_feature_discovery.copy'
            copyDefault={'When you connect MatterFOSS with your organization\'s single sign-on provider, users can access MatterFOSS without having to re-enter their credentials.'}
            learnMoreURL='https://www.example.com/docs-saml/?utm_medium=product&utm_source=product-feature-discovery&utm_content=saml'
            imgPath={saml}
        />
    );
};

t('admin.saml_feature_discovery.title');
t('admin.saml_feature_discovery.copy');

export default SAMLFeatureDiscovery;