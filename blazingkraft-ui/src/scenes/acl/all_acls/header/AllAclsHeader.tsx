import { AclPermissions } from 'common/permissions/cluster/AclPermissions';
import { AclBinding } from 'common/types/acl_binding';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllAclsHeaderComponent from './AllAclsHeaderComponent';

interface AllAclsHeaderProps {
    refreshPageContent: () => void;
    setAclBindingToDelete: (aclBinding: AclBinding) => void;
    setIsDeleteAclBindingModalOpen: (isOpen: boolean) => void;
}

const AllAclsHeader = ({
    refreshPageContent,
    setAclBindingToDelete,
    setIsDeleteAclBindingModalOpen,
}: AllAclsHeaderProps) => {
    // Map State To Props
    const { aclBindings, isGetAclBindingsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAclBindingsPending:
                    store.aclReducer.isGetAclBindingsPending,
                aclBindings: store.aclReducer.aclBindings,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    const { isAuthorized: isAuthorizedCreateAcl } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: AclPermissions.ACL_PERMISSIONS.CREATE_ACL,
            },
        ],
    });

    const { isAuthorized: isAuthorizedDeleteAcl } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: AclPermissions.ACL_PERMISSIONS.DELETE_ACL,
            },
        ],
    });

    return (
        <AllAclsHeaderComponent
            setAclBindingToDelete={setAclBindingToDelete}
            setIsDeleteAclBindingModalOpen={setIsDeleteAclBindingModalOpen}
            isRefreshPageContentPending={isGetAclBindingsPending}
            refreshPageContent={refreshPageContent}
            aclsLength={aclBindings.length}
            isAuthorizedCreateAcl={isAuthorizedCreateAcl}
            isAuthorizedDeleteAcl={isAuthorizedDeleteAcl}
        />
    );
};

export default AllAclsHeader;
