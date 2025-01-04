import { useEffect, useMemo, useState } from 'react';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTransition from 'scenes/common/transition/CommonTransition';
import { PublishedRecord } from '../../BlazingProducerBodyComponent';

interface BlazingProducerRecordsPagingProps {
    allRecords: PublishedRecord[];
    setDisplayedRecords: (displayedRecords: PublishedRecord[]) => void;
}

const PRODUCER_RECORDS_RESULTS_SIZE = 50;

function BlazingProducerRecordsPaging({
    allRecords,
    setDisplayedRecords,
}: BlazingProducerRecordsPagingProps) {
    const [page, setPage] = useState(0);

    const lastPage = useMemo(() => {
        return Math.ceil(allRecords.length / PRODUCER_RECORDS_RESULTS_SIZE);
    }, [allRecords]);

    useEffect(() => {
        if (allRecords.length === 0) {
            setDisplayedRecords([]);
            setPage(0);
        } else if (allRecords.length <= PRODUCER_RECORDS_RESULTS_SIZE) {
            setDisplayedRecords(allRecords);
        } else {
            setDisplayedRecords(
                allRecords.slice(
                    page * PRODUCER_RECORDS_RESULTS_SIZE,
                    (page + 1) * PRODUCER_RECORDS_RESULTS_SIZE,
                ),
            );
        }
    }, [allRecords]);

    if (allRecords.length <= PRODUCER_RECORDS_RESULTS_SIZE) {
        return <></>;
    }

    return (
        <CommonTransition key={page}>
            <div className="flex mb-1">
                <CommonButton
                    className="w-1/3 mr-2"
                    color="blue"
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => {
                        const newPage = page - 1;
                        const from = page - 1;
                        const to = page;

                        setDisplayedRecords(
                            allRecords.slice(
                                from * PRODUCER_RECORDS_RESULTS_SIZE,
                                to * PRODUCER_RECORDS_RESULTS_SIZE,
                            ),
                        );
                        setPage(newPage);
                    }}
                >
                    Previous Page
                </CommonButton>
                <CommonButton className="w-1/3" color="blue" variant="light">
                    Page {page + 1} of {lastPage}
                </CommonButton>
                <CommonButton
                    className="w-1/3 ml-2"
                    color="blue"
                    variant="outline"
                    disabled={page + 1 === lastPage}
                    onClick={() => {
                        const newPage = page + 1;
                        const from = page + 1;
                        const to = page + 2;

                        setDisplayedRecords(
                            allRecords.slice(
                                from * PRODUCER_RECORDS_RESULTS_SIZE,
                                to * PRODUCER_RECORDS_RESULTS_SIZE,
                            ),
                        );
                        setPage(newPage);
                    }}
                >
                    Next Page
                </CommonButton>
            </div>
        </CommonTransition>
    );
}

export default BlazingProducerRecordsPaging;
