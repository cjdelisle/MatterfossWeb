// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {mount} from 'enzyme';
import {IntlProvider} from 'react-intl';

import FormattedMarkdownMessage from 'components/formatted_markdown_message.jsx';

describe('components/FormattedMarkdownMessage', () => {
    test('should render message', () => {
        const props = {
            id: 'test.foo',
            defaultMessage: '**bold** *italic* [link](https://matterfoss.com/) <br/> [link target blank](!https://matterfoss.com/)',
        };
        const wrapper = mount(wrapProvider(<FormattedMarkdownMessage {...props}/>));
        expect(wrapper).toMatchSnapshot();
    });

    test('should backup to default', () => {
        const props = {
            id: 'xxx',
            defaultMessage: 'testing default message',
        };
        const wrapper = mount(wrapProvider(<FormattedMarkdownMessage {...props}/>));
        expect(wrapper).toMatchSnapshot();
    });

    test('should escape non-BR', () => {
        const props = {
            id: 'test.bar',
            defaultMessage: '',
            values: {
                b: (...content) => `<b>${content}</b>`,
                script: (...content) => `<script>${content}</script>`,
            },
        };
        const wrapper = mount(wrapProvider(<FormattedMarkdownMessage {...props}/>));
        expect(wrapper).toMatchSnapshot();
    });

    test('values should work', () => {
        const props = {
            id: 'test.vals',
            defaultMessage: '*Hi* {petName}!',
            values: {
                petName: 'sweetie',
            },
        };
        const wrapper = mount(wrapProvider(<FormattedMarkdownMessage {...props}/>));
        expect(wrapper).toMatchSnapshot();
    });

    test('should allow to disable links', () => {
        const props = {
            id: 'test.vals',
            defaultMessage: '*Hi* {petName}!',
            values: {
                petName: 'http://www.matterfoss.com',
            },
            disableLinks: true,
        };
        const wrapper = mount(wrapProvider(<FormattedMarkdownMessage {...props}/>));
        expect(wrapper).toMatchSnapshot();
    });
});

export function wrapProvider(el) {
    const enTranslationData = {
        'test.foo': '**bold** *italic* [link](https://matterfoss.com/) <br/> [link target blank](!https://matterfoss.com/)',
        'test.bar': '<b>hello</b> <script>var malicious = true;</script> world!',
        'test.vals': '*Hi* {petName}!',
    };
    return (
        <IntlProvider
            locale={'en'}
            messages={enTranslationData}
        >
            {el}
        </IntlProvider>)
    ;
}
