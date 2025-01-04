import { Anchor, Button, Grid, Text } from '@mantine/core';
import { AclBinding } from 'common/types/acl_binding';
import { AclUtils } from 'common/utils/AclUtils';
import { useEffect, useState } from 'react';
import { TbTrash, TbX } from 'react-icons/tb';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { AclBindingRequest } from '../redux/actions';

interface DeleteAclComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    deleteAclBinding: Function;
    isDeleteAclBindingPending: boolean;
    aclBindingToDelete: AclBinding;
}

function renderModalBody(
    acl: AclBindingRequest,
    setAcl: (acl: AclBindingRequest) => void,
) {
    return (
        <>
            <Grid className="mb-4">
                <Grid.Col span={12}>
                    <CommonTextInput
                        label="Principal"
                        placeholder="Principal"
                        value={acl.principal}
                        onChange={value => {
                            setAcl({ ...acl, principal: value });
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={6} xl={4}>
                    <CommonSelect
                        data={AclUtils.ALL_RESOURCE_TYPES_OPTIONS}
                        label="Resource Type"
                        placeholder="Resource Type"
                        searchable
                        creatable
                        value={acl.resourceType}
                        onChange={value => {
                            setAcl({
                                ...acl,
                                resourceType: value,
                            });
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={6} xl={4}>
                    <CommonTextInput
                        label="Resource Name"
                        placeholder="Resource Name"
                        value={acl.resourceName}
                        onChange={value => {
                            setAcl({ ...acl, resourceName: value });
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={6} xl={4}>
                    <CommonSelect
                        data={AclUtils.ALL_OPERATIONS_OPTIONS}
                        label="Operation"
                        placeholder="Operation"
                        searchable
                        creatable
                        value={acl.operation}
                        onChange={value => {
                            setAcl({ ...acl, operation: value });
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={6} xl={4}>
                    <CommonSelect
                        data={AclUtils.ALL_PERMISSION_TYPES_OPTIONS}
                        label="Permission Type"
                        placeholder="Permission Type"
                        searchable
                        creatable
                        value={acl.permissionType}
                        onChange={value => {
                            setAcl({ ...acl, permissionType: value });
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={6} xl={4}>
                    <CommonSelect
                        data={AclUtils.ALL_PATTERN_TYPES_OPTIONS}
                        label="Pattern Type"
                        placeholder="Pattern Type"
                        searchable
                        creatable
                        value={acl.patternType}
                        onChange={value => {
                            setAcl({ ...acl, patternType: value });
                        }}
                    />
                </Grid.Col>

                <Grid.Col span={12} md={6} xl={4}>
                    <CommonTextInput
                        label="Host"
                        placeholder="Host"
                        value={acl.host}
                        onChange={value => {
                            setAcl({ ...acl, host: value });
                        }}
                    />
                </Grid.Col>
            </Grid>
            <Text className="pt-2" size="xs" color="dimmed">
                <Anchor
                    size="xs"
                    href={`https://kafka.apache.org/32/documentation/#security_authz`}
                    target="_blank"
                    className="mr-2"
                >
                    Click here
                </Anchor>
                to learn more about ACLs and authorization in apache kafka.
            </Text>
        </>
    );
}

function renderModalFooter(setIsModalOpen, action) {
    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </Button>
            <Button
                color="red"
                leftIcon={<TbTrash size="1rem" />}
                onClick={() => action()}
            >
                Delete
            </Button>
        </div>
    );
}

function DeleteAclComponent({
    isModalOpen,
    setIsModalOpen,
    deleteAclBinding,
    isDeleteAclBindingPending,
    aclBindingToDelete,
}: DeleteAclComponentProps) {
    const [acl, setAcl] = useState<AclBindingRequest>({
        principal: 'User:{principal}',
        host: '*',
        operation: 'ALL',
        patternType: 'LITERAL',
        resourceType: 'ANY',
        resourceName: '*',
        permissionType: 'ALLOW',
    });

    useEffect(() => {
        if (isModalOpen && aclBindingToDelete) {
            setAcl({
                principal: aclBindingToDelete.principal,
                host: aclBindingToDelete.host,
                operation: aclBindingToDelete.operation,
                patternType: aclBindingToDelete.patternType,
                resourceType: aclBindingToDelete.resourceType,
                resourceName: aclBindingToDelete.resourceName,
                permissionType: aclBindingToDelete.permissionType,
            });
        }
    }, [isModalOpen]);

    const action = () => deleteAclBinding(acl);
    const modalBody = renderModalBody(acl, setAcl);
    const modalFooter = renderModalFooter(setIsModalOpen, action);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">ACL Binding Deletion</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isDeleteAclBindingPending}
        />
    );
}

export default DeleteAclComponent;
