import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteKsqlDb from '../delete_ksqldb/DeleteKsqlDb';
import AllKsqlDbsBody from './body/AllKsqlDbsBody';
import AllKsqlDbsHeader from './header/AllKsqlDbsHeader';

interface AllKsqlDbsComponentProps {
    refreshPageContent: () => void;
}

function AllKsqlDbsComponent({ refreshPageContent }: AllKsqlDbsComponentProps) {
    const [ksqlDbToDelete, setKsqlDbToDelete] = useState<string | null>(null);
    const [isDeleteKsqlDbModalOpen, setIsDeleteKsqlDbModalOpen] =
        useState(false);
    return (
        <>
            <AllKsqlDbsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllKsqlDbsBody
                    setKsqlDbToDelete={setKsqlDbToDelete}
                    setIsDeleteKsqlDbModalOpen={setIsDeleteKsqlDbModalOpen}
                />
            </CommonBody>
            <DeleteKsqlDb
                ksqlDbToDelete={ksqlDbToDelete}
                isModalOpen={isDeleteKsqlDbModalOpen}
                setIsModalOpen={setIsDeleteKsqlDbModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllKsqlDbsComponent;
