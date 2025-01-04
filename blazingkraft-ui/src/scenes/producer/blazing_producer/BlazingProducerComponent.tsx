import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CommonBody from 'scenes/common/body/CommonBody';
import BlazingProducerBody from './body/BlazingProducerBody';
import BlazingProducerHeader from './header/BlazingProducerHeader';

interface BlazingProducerComponentProps {
    refreshPageContent: () => void;
}

function BlazingProducerComponent({
    refreshPageContent,
}: BlazingProducerComponentProps) {
    const [searchParams] = useSearchParams({});

    const topic = searchParams.get('topic');
    const [
        isImportBlazingRecordsModalOpen,
        setIsImportBlazingRecordsModalOpen,
    ] = useState(false);

    return (
        <>
            <BlazingProducerHeader
                refreshPageContent={refreshPageContent}
                topic={topic}
                setIsImportBlazingRecordsModalOpen={
                    setIsImportBlazingRecordsModalOpen
                }
            />
            <CommonBody>
                <BlazingProducerBody
                    topic={topic}
                    isImportBlazingRecordsModalOpen={
                        isImportBlazingRecordsModalOpen
                    }
                    setIsImportBlazingRecordsModalOpen={
                        setIsImportBlazingRecordsModalOpen
                    }
                />
            </CommonBody>
        </>
    );
}

export default BlazingProducerComponent;
