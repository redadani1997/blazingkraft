import { AclBinding } from 'common/types/acl_binding';
import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteAcl from '../delete_acl/DeleteAcl';
import AllAclsBody from './body/AllAclsBody';
import AllAclsHeader from './header/AllAclsHeader';

interface AllAclsComponentProps {
    refreshPageContent: () => void;
}

function AllAclsComponent({ refreshPageContent }: AllAclsComponentProps) {
    const [isDeleteAclBindingModalOpen, setIsDeleteAclBindingModalOpen] =
        useState(false);
    const [aclBindingToDelete, setAclBindingToDelete] = useState<AclBinding>();
    return (
        <>
            <AllAclsHeader
                refreshPageContent={refreshPageContent}
                setAclBindingToDelete={setAclBindingToDelete}
                setIsDeleteAclBindingModalOpen={setIsDeleteAclBindingModalOpen}
            />
            <CommonBody>
                <AllAclsBody
                    setAclBindingToDelete={setAclBindingToDelete}
                    setIsDeleteAclBindingModalOpen={
                        setIsDeleteAclBindingModalOpen
                    }
                />
            </CommonBody>
            <DeleteAcl
                isModalOpen={isDeleteAclBindingModalOpen}
                setIsModalOpen={setIsDeleteAclBindingModalOpen}
                aclBindingToDelete={aclBindingToDelete}
                refreshPageContent={refreshPageContent}
            />
        </>
    );
}

export default AllAclsComponent;
