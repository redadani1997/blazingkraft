import { AclPermissions } from 'common/permissions/cluster/AclPermissions';
import { AclBinding } from 'common/types/acl_binding';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllAclsBodyComponent from './AllAclsBodyComponent';

interface AllAclsBodyProps {
    setAclBindingToDelete: (aclBinding: AclBinding) => void;
    setIsDeleteAclBindingModalOpen: (isOpen: boolean) => void;
}

const AllAclsBody = (props: AllAclsBodyProps) => {
    // Map State To Props
    const { isGetAclBindingsPending, aclBindings } = useSelector(
        (store: ReduxStore) => {
            return {
                aclBindings: store.aclReducer.aclBindings,
                isGetAclBindingsPending:
                    store.aclReducer.isGetAclBindingsPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();

    const { isAuthorized: isAuthorizedDeleteAcl } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission: AclPermissions.ACL_PERMISSIONS.DELETE_ACL,
            },
        ],
    });

    return (
        <AllAclsBodyComponent
            {...props}
            isGetAclBindingsPending={isGetAclBindingsPending}
            aclBindings={aclBindings}
            isAuthorizedDeleteAcl={isAuthorizedDeleteAcl}
        />
    );
};

export default AllAclsBody;
