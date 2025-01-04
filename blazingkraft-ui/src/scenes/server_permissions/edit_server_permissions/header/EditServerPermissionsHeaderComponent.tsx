import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface EditServerPermissionsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(refreshPageContent, isRefreshPageContentPending) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Edit Server Permissions"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function EditServerPermissionsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: EditServerPermissionsHeaderComponentProps) {
    const title = renderTitle(refreshPageContent, isRefreshPageContentPending);
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: true,
                        label: 'Management',
                    },
                    {
                        highlighted: false,
                        to: '/management/server_permissions',
                        label: 'Server Permissions',
                    },
                    {
                        highlighted: true,
                        label: 'Edit',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default EditServerPermissionsHeaderComponent;
