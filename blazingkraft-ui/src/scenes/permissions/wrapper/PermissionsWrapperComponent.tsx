import { Checkbox, Divider, Grid, Paper } from '@mantine/core';
import { PermissionLabel } from 'common/permissions';

interface PermissionsWrapperComponentProps {
    header: string;
    permissions: string[];
    setPermissions: (permissions: string[]) => void;
    permissionLabels: PermissionLabel[];
    disabled?: boolean;
}

function PermissionsWrapperComponent({
    header,
    permissionLabels,
    permissions,
    setPermissions,
    disabled,
}: PermissionsWrapperComponentProps) {
    return (
        <Grid.Col span={12} md={6} lg={4}>
            <Paper withBorder shadow="md" className="flex flex-col h-full">
                <Divider label={header} labelPosition="center" />
                {permissionLabels.map((permissionLabel: PermissionLabel) => (
                    <Checkbox
                        className="m-2"
                        key={permissionLabel.permission}
                        checked={permissions.includes(
                            permissionLabel.permission,
                        )}
                        onChange={event => {
                            if (event.target.checked) {
                                setPermissions([
                                    ...permissions,
                                    permissionLabel.permission,
                                ]);
                            } else {
                                setPermissions(
                                    permissions.filter(
                                        (permission: string) =>
                                            permission !==
                                            permissionLabel.permission,
                                    ),
                                );
                            }
                        }}
                        label={permissionLabel.label}
                        disabled={disabled}
                    />
                ))}
            </Paper>
        </Grid.Col>
    );
}

export default PermissionsWrapperComponent;
