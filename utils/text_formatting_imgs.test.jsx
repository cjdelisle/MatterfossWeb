// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import assert from 'assert';

import * as Markdown from 'utils/markdown';
import {formatText} from 'utils/text_formatting';

describe('Markdown.Imgs', () => {
    it('Inline mage', (done) => {
        assert.equal(
            Markdown.format('![Matterfoss](/images/icon.png)').trim(),
            '<p><img src="/images/icon.png" alt="Matterfoss" class="markdown-inline-img"></p>',
        );

        done();
    });

    it('Image with hover text', (done) => {
        assert.equal(
            Markdown.format('![Matterfoss](/images/icon.png "Matterfoss Icon")').trim(),
            '<p><img src="/images/icon.png" alt="Matterfoss" title="Matterfoss Icon" class="markdown-inline-img"></p>',
        );

        done();
    });

    it('Image with link', (done) => {
        assert.equal(
            Markdown.format('[![Matterfoss](../../images/icon-76x76.png)](https://github.com/matterfoss/platform)').trim(),
            '<p><a class="theme markdown__link" href="https://github.com/matterfoss/platform" rel="noreferrer" target="_blank"><img src="../../images/icon-76x76.png" alt="Matterfoss" class="markdown-inline-img"></a></p>',
        );

        done();
    });

    it('Image with width and height', (done) => {
        assert.equal(
            Markdown.format('![Matterfoss](../../images/icon-76x76.png =50x76 "Matterfoss Icon")').trim(),
            '<p><img src="../../images/icon-76x76.png" alt="Matterfoss" title="Matterfoss Icon" width="50" height="76" class="markdown-inline-img"></p>',
        );

        done();
    });

    it('Image with width', (done) => {
        assert.equal(
            Markdown.format('![Matterfoss](../../images/icon-76x76.png =50 "Matterfoss Icon")').trim(),
            '<p><img src="../../images/icon-76x76.png" alt="Matterfoss" title="Matterfoss Icon" width="50" class="markdown-inline-img"></p>',
        );

        done();
    });
});

describe('Text-formatted inline markdown images', () => {
    it('Not enclosed in a p tag', (done) => {
        const options = {markdown: true};
        const output = formatText('![Matterfoss](/images/icon.png)', options);

        assert.equal(
            output,
            '<div className="markdown-inline-img__container"><img src="/images/icon.png" alt="Matterfoss" class="markdown-inline-img"></div>',
        );

        done();
    });
});
