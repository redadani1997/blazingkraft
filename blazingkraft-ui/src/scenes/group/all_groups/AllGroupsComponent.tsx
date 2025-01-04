import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteGroup, { IGroupToDelete } from '../delete_group/DeleteGroup';
import AllGroupsBody from './body/AllGroupsBody';
import AllGroupsHeader from './header/AllGroupsHeader';

interface AllGroupsComponentProps {
    refreshPageContent: () => void;
}

function AllGroupsComponent({ refreshPageContent }: AllGroupsComponentProps) {
    const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState<IGroupToDelete>(null);
    return (
        <>
            <AllGroupsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllGroupsBody
                    setIsDeleteGroupModalOpen={setIsDeleteGroupModalOpen}
                    setGroupToDelete={setGroupToDelete}
                />
            </CommonBody>
            <DeleteGroup
                groupToDelete={groupToDelete}
                setIsModalOpen={setIsDeleteGroupModalOpen}
                isModalOpen={isDeleteGroupModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllGroupsComponent;
