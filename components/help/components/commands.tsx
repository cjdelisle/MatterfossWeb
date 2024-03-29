// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

import FormattedMarkdownMessage from 'components/formatted_markdown_message.jsx';
import HelpLinks from 'components/help/components/help_links';
import {HelpLink} from 'components/help/types';

export default function HelpCommands(): JSX.Element {
    return (
        <div>
            <h1 className='markdown__heading'>
                <FormattedMessage
                    id='help.commands.title'
                    defaultMessage='Executing Commands'
                />
            </h1>

            <hr/>

            <p>
                <FormattedMarkdownMessage
                    id='help.commands.intro1'
                    defaultMessage='You can execute commands, called slash commands, by typing into the text input box to perform operations in MatterFOSS. To run a slash command, type `/` followed by a command and some arguments to perform actions.'
                />
            </p>

            <h2 className='markdown__heading'>
                <FormattedMarkdownMessage
                    id='help.commands.builtin.title'
                    defaultMessage='Built-In Commands'
                />
            </h2>

            <p>
                <FormattedMarkdownMessage
                    id='help.commands.intro2'
                    defaultMessage='Built-in slash commands come with all MatterFOSS installations. See the [product documentation](!https://docs.matterfoss.com/messaging/executing-slash-commands.html) for a list of available built-in slash commands.'
                />
            </p>
            <p>
                <FormattedMarkdownMessage
                    id='help.commands.builtin2'
                    defaultMessage='Begin by typing `/`. A list of slash command options displays above the text input box. The autocomplete suggestions provide you with a format example in black text and a short description of the slash command in grey text.'
                />
            </p>

            <p>
                <img
                    src='https://docs.matterfoss.com/_images/slash-commands.gif'
                    alt='Slash command autocomplete'
                    className='markdown-inline-img'
                />
            </p>

            <h2 className='markdown__heading'>
                <FormattedMarkdownMessage
                    id='help.commands.custom.title'
                    defaultMessage='Custom Commands'
                />
            </h2>

            <p>
                <FormattedMarkdownMessage
                    id='help.commands.custom.description'
                    defaultMessage='Custom slash commands can integrate with external applications. For example, a team might configure a custom slash command to check internal health records with `/patient joe smith` or check the weekly weather forecast in a city with `/weather toronto week`. Check with your System Admin, or open the autocomplete list by typing `/`, to determine whether custom slash commands are available for your organization.'
                />
            </p>

            <p>
                <FormattedMarkdownMessage
                    id='help.commands.custom2'
                    defaultMessage='Custom slash commands are disabled by default and can be enabled by the System Admin in the System Console by going to **Integrations > Integration Management**. Learn about configuring custom slash commands in the [developer   documentation](!https://developers.matterfoss.com/integrate/slash-commands/).'
                />
            </p>

            <HelpLinks excludedLinks={[HelpLink.Commands]}/>
        </div>
    );
}
