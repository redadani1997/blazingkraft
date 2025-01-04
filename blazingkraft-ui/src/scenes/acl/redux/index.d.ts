import { AclBinding } from 'common/types/acl_binding';

export type AclReducerState = {
    aclBindings: AclBinding[];
    isGetAclBindingsPending: boolean;
    isCreateAclBindingPending: boolean;
    isDeleteAclBindingPending: boolean;
};
