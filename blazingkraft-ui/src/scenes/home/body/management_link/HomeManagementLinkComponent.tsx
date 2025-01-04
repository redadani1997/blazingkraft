import { ActionIcon, Grid, Tooltip } from '@mantine/core';
import React from 'react';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface HomeManagementLinkComponentProps {
    isAuthorizedDataMaskingFeature: boolean;
    isAuthorizedGroupFeature: boolean;
    isAuthorizedOIDCProviderFeature: boolean;
    isAuthorizedServerPermissionsFeature: boolean;
    isAuthorizedUserFeature: boolean;
    isAuthorizedAuditFeature: boolean;
    isAuthorizedAlertFeature: boolean;
}

function determineLink(
    isAuthorizedDataMaskingFeature,
    isAuthorizedGroupFeature,
    isAuthorizedOIDCProviderFeature,
    isAuthorizedServerPermissionsFeature,
    isAuthorizedUserFeature,
    isAuthorizedAuditFeature,
    isAuthorizedAlertFeature,
) {
    if (isAuthorizedUserFeature) {
        return '/management/users';
    }
    if (isAuthorizedGroupFeature) {
        return '/management/groups';
    }
    if (isAuthorizedOIDCProviderFeature) {
        return '/management/oidc_providers';
    }
    if (isAuthorizedServerPermissionsFeature) {
        return '/management/server_permissions';
    }
    if (isAuthorizedDataMaskingFeature) {
        return '/management/data_masking';
    }
    if (isAuthorizedAuditFeature) {
        return '/management/audit';
    }
    if (isAuthorizedAlertFeature) {
        return '/management/alert';
    }
    return '/home';
}

function HomeManagementLinkComponent({
    isAuthorizedDataMaskingFeature,
    isAuthorizedGroupFeature,
    isAuthorizedOIDCProviderFeature,
    isAuthorizedServerPermissionsFeature,
    isAuthorizedUserFeature,
    isAuthorizedAuditFeature,
    isAuthorizedAlertFeature,
}: HomeManagementLinkComponentProps) {
    const link = determineLink(
        isAuthorizedDataMaskingFeature,
        isAuthorizedGroupFeature,
        isAuthorizedOIDCProviderFeature,
        isAuthorizedServerPermissionsFeature,
        isAuthorizedUserFeature,
        isAuthorizedAuditFeature,
        isAuthorizedAlertFeature,
    );

    return (
        <Grid.Col span={12} xs={6} sm={4} md={3} lg={2}>
            <div className="flex items-center justify-center w-full h-full">
                <Tooltip label="Management">
                    <ActionIcon
                        className="p-4"
                        component={Link}
                        to={link}
                        color="blue"
                        size="10rem"
                    >
                        <MdOutlineManageAccounts size="10rem" />
                    </ActionIcon>
                </Tooltip>
            </div>
        </Grid.Col>
    );
}

export default React.memo(HomeManagementLinkComponent);
