import {
    AclOperation,
    AclPatternType,
    AclPermissionType,
    AclResourceType,
} from 'common/types/acl_binding';
import { POST, PUT } from 'rest/RestCalls';
import aclTypes from './types';

export interface AclBindingRequest {
    principal: string | null;
    host: string | null;
    operation: AclOperation | string | null;
    patternType: AclPatternType | string | null;
    resourceType: AclResourceType | string | null;
    permissionType: AclPermissionType | string | null;
    resourceName: string | null;
}

function getAclBindings(acl: AclBindingRequest, clusterCode) {
    return {
        type: aclTypes.GET_ACL_BINDINGS,
        payload: POST('/admin/acl-bindings/list', acl, {
            headers: { clusterCode },
        }),
        meta: { context: 'ACL Bindings' },
    };
}

function createAclBinding(acl: AclBindingRequest, clusterCode) {
    return {
        type: aclTypes.CREATE_ACL_BINDING,
        payload: POST('/admin/acl-bindings/create', acl, {
            headers: { clusterCode },
        }),
        meta: { context: 'ACL Bindings', principal: acl.principal },
    };
}

function deleteAclBinding(acl: AclBindingRequest, clusterCode) {
    return {
        type: aclTypes.DELETE_ACL_BINDING,
        payload: PUT('/admin/acl-bindings/delete', acl, {
            headers: { clusterCode },
        }),
        meta: { context: 'ACL Bindings', principal: acl.principal },
    };
}

const aclActions = {
    getAclBindings,
    createAclBinding,
    deleteAclBinding,
};

export default aclActions;
