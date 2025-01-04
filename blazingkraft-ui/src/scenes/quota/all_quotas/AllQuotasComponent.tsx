import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import AlterQuotas from '../alter_quota/AlterQuotas';
import AllQuotasBody from './body/AllQuotasBody';
import AllQuotasHeader from './header/AllQuotasHeader';

interface AllQuotasComponentProps {
    refreshPageContent: () => void;
}

function AllQuotasComponent({ refreshPageContent }: AllQuotasComponentProps) {
    const [isAlterQuotasModalOpen, setIsAlterQuotasModalOpen] = useState(false);
    const [quotaEntryToAlter, setQuotaEntryToAlter] = useState<any>();
    return (
        <>
            <AllQuotasHeader
                refreshPageContent={refreshPageContent}
                setIsAlterQuotasModalOpen={setIsAlterQuotasModalOpen}
                setQuotaEntryToAlter={setQuotaEntryToAlter}
            />
            <CommonBody>
                <AllQuotasBody
                    setIsAlterQuotasModalOpen={setIsAlterQuotasModalOpen}
                    setQuotaEntryToAlter={setQuotaEntryToAlter}
                />
            </CommonBody>
            <AlterQuotas
                isModalOpen={isAlterQuotasModalOpen}
                setIsModalOpen={setIsAlterQuotasModalOpen}
                refreshPageContent={refreshPageContent}
                quotaEntryToAlter={quotaEntryToAlter}
            />
        </>
    );
}

export default AllQuotasComponent;
