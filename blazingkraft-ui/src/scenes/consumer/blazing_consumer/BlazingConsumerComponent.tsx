import React from 'react';
import { useSearchParams } from 'react-router-dom';
import CommonBody from 'scenes/common/body/CommonBody';
import BlazingConsumerBody from './body/BlazingConsumerBody';
import BlazingConsumerHeader from './header/BlazingConsumerHeader';

interface BlazingConsumerComponentProps {
    refreshPageContent: () => void;
}

function BlazingConsumerComponent({
    refreshPageContent,
}: BlazingConsumerComponentProps) {
    const [searchParams] = useSearchParams({});

    const topicsString = searchParams.get('topics');
    const topics = topicsString ? topicsString.split(';') : [];
    return (
        <>
            <BlazingConsumerHeader
                refreshPageContent={refreshPageContent}
                topics={topics}
            />
            <CommonBody>
                <BlazingConsumerBody topics={topics} />
            </CommonBody>
        </>
    );
}

export default React.memo(BlazingConsumerComponent);
