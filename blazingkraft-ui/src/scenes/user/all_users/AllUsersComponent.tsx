import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteUser from '../delete_user/DeleteUser';
import AllUsersBody from './body/AllUsersBody';
import AllUsersHeader from './header/AllUsersHeader';

interface AllUsersComponentProps {
    refreshPageContent: () => void;
}

function AllUsersComponent({ refreshPageContent }: AllUsersComponentProps) {
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    return (
        <>
            <AllUsersHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllUsersBody
                    setUserToDelete={setUserToDelete}
                    setIsDeleteUserModalOpen={setIsDeleteUserModalOpen}
                />
            </CommonBody>
            <DeleteUser
                setIsModalOpen={setIsDeleteUserModalOpen}
                isModalOpen={isDeleteUserModalOpen}
                userToDelete={userToDelete}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllUsersComponent;
