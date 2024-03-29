// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

import {Client4} from 'matterfoss-redux/client';
import {Job} from 'matterfoss-redux/types/jobs';

import {exportFormats} from 'utils/constants';

const JobDownloadLink = React.memo(({job}: {job: Job}): JSX.Element => {
    if (job.data?.is_downloadable === 'true' && parseInt(job.data?.messages_exported, 10) > 0 && job.data?.export_type !== exportFormats.EXPORT_FORMAT_GLOBALRELAY) { // eslint-disable-line camelcase
        return (
            <a
                key={job.id}
                href={`${Client4.getJobsRoute()}/${job.id}/download`}
                target='_blank'
                rel='noopener noreferrer'
                className='JobDownloadLink'
            >
                <FormattedMessage
                    id='admin.jobTable.downloadLink'
                    defaultMessage='Download'
                />
            </a>
        );
    }

    return <>{'--'}</>;
});

export default JobDownloadLink;
