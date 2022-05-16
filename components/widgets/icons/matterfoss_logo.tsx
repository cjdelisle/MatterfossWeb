// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {CSSProperties} from 'react';
import {useIntl} from 'react-intl';

export default function MatterFOSSLogo(props: React.HTMLAttributes<HTMLSpanElement>) {
    const {formatMessage} = useIntl();
    return (
        <span {...props}>
            <svg
                version='1.1'
                x='0px'
                y='0px'
                viewBox='0 0 124 124'
                enableBackground='new 0 0 124 124'
                role='img'
                aria-label={formatMessage({id: 'generic_icons.matterfoss', defaultMessage: 'MatterFOSS Logo'})}
            >
                <g>
                    <path
                        style={style}
                        d="m 81.6,68.842 c -2.261,1.799 -8.515,5.977 -17.573,5.81 -9.258,-0.16 -15.368,-4.695 -17.566,-6.636 -0.642,-0.569 -1.627,-0.51 -2.198,0.126 -0.572,0.637 -0.515,1.613 0.127,2.181 2.456,2.172 9.281,7.241 19.582,7.419 0.185,0.003 0.367,0.005 0.55,0.005 9.786,0 16.545,-4.521 19.025,-6.493 0.67,-0.533 0.778,-1.506 0.241,-2.172 -0.537,-0.667 -1.518,-0.775 -2.188,-0.24 z"
                    />
                    <path
                        style={style}
                        d="M 64,2 C 29.813,2 2,29.813 2,64 2,98.187 29.813,126 64,126 98.187,126 126,98.187 126,64 126,29.813 98.187,2 64,2 Z m 25.07,84.124 c -0.726,0.354 -1.058,1.199 -0.766,1.947 2.658,6.783 3.634,7.628 8.324,11.684 0.687,0.594 1.461,1.263 2.338,2.037 -6.52,0.546 -27.624,-1.916 -33.851,-9.563 C 64.82,91.866 64.376,91.656 63.906,91.655 39.063,91.619 18.852,76.923 18.852,58.896 c 0,-18.064 20.253,-32.761 45.147,-32.761 24.894,0 45.147,14.697 45.147,32.761 0.001,10.932 -7.505,21.11 -20.076,27.228 z"
                    />
                </g>
            </svg>
        </span>
    );
}

const style: CSSProperties = {
    fillRule: 'evenodd',
    clipRule: 'evenodd',
};
