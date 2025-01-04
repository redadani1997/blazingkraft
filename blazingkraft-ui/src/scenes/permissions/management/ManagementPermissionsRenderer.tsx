import React from 'react';
import ManagementPermissionsRendererComponent from './ManagementPermissionsRendererComponent';

interface ManagementPermissionsRendererInterface {
    managementPermissions: string[];
    setManagementPermissions: (managementPermissions: string[]) => void;
    disabled?: boolean;
    basePermissions?: string[];
}

const ManagementPermissionsRenderer = (
    props: ManagementPermissionsRendererInterface,
) => {
    // Map State To Props

    // Map Dispatch To Props

    return <ManagementPermissionsRendererComponent {...props} />;
};

export default React.memo(ManagementPermissionsRenderer);
