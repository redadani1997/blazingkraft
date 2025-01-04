import { Button } from '@mantine/core';
import { TbPencil } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface ServerPermissionsDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    isAuthorizedEditServerPermissions: boolean;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedEditServerPermissions,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Server Permissions"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {isAuthorizedEditServerPermissions && (
                <Button
                    component={Link}
                    to="/management/server_permissions/edit"
                    leftIcon={<TbPencil size={22} />}
                >
                    Edit Server Permissions
                </Button>
            )}
        </div>
    );
}

function ServerPermissionsDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedEditServerPermissions,
}: ServerPermissionsDetailsHeaderComponentProps) {
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        isAuthorizedEditServerPermissions,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: true,
                        label: 'Management',
                    },
                    {
                        highlighted: true,
                        label: 'Server Permissions',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default ServerPermissionsDetailsHeaderComponent;
