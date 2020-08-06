// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

export default class MatterfossLogo extends React.PureComponent {
    render() {
        return (
            <span {...this.props}>
                <FormattedMessage
                    id='generic_icons.matterfoss'
                    defaultMessage='Matterfoss Logo'
                >
                    {(ariaLabel) => (
                        <svg
                            version='1.1'
                            x='0px'
                            y='0px'
                            viewBox='0 0 500 500'
                            style={style.background}
                            role='img'
                            aria-label={ariaLabel}
                        >
                            <g>
                                <g>
                                    <path
                                        d="M81.6,68.842c-2.261,1.799-8.515,5.977-17.573,5.81c-9.258-0.16-15.368-4.695-17.566-6.636    c-0.642-0.569-1.627-0.51-2.198,0.126c-0.572,0.637-0.515,1.613,0.127,2.181c2.456,2.172,9.281,7.241,19.582,7.419    c0.185,0.003,0.367,0.005,0.55,0.005c9.786,0,16.545-4.521,19.025-6.493c0.67-0.533,0.778-1.506,0.241-2.172    C83.251,68.415,82.27,68.307,81.6,68.842z"
                                    />
                                    <path
                                        d="M64,2C29.813,2,2,29.813,2,64s27.813,62,62,62s62-27.813,62-62S98.187,2,64,2z M89.07,86.124    c-0.726,0.354-1.058,1.199-0.766,1.947c2.658,6.783,3.634,7.628,8.324,11.684c0.687,0.594,1.461,1.263,2.338,2.037    c-6.52,0.546-27.624-1.916-33.851-9.563c-0.295-0.363-0.739-0.573-1.209-0.574c-24.843-0.036-45.054-14.732-45.054-32.759    c0-18.064,20.253-32.761,45.147-32.761s45.147,14.697,45.147,32.761C109.147,69.828,101.641,80.006,89.07,86.124z"
                                    />
                                </g>
                            </g>
                        </svg>
                    )}
                </FormattedMessage>
            </span>
        );
    }
}

const style = {
    background: {
        enableBackground: 'new 0 0 500 500',
    },
    st0: {
        fillRule: 'evenodd',
        clipRule: 'evenodd',
    },
};
