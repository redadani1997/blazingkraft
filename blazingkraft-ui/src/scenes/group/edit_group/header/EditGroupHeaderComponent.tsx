import { GroupDetails } from 'common/types/group';
import { useParams } from 'react-router';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface EditGroupHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    groupDetails: GroupDetails;
}

function renderTitle(
    groupDetails,
    groupCode,
    refreshPageContent,
    isRefreshPageContentPending,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={groupDetails?.name || groupCode}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function EditGroupHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    groupDetails,
}: EditGroupHeaderComponentProps) {
    const { groupCode } = useParams();
    const title = renderTitle(
        groupDetails,
        groupCode,
        refreshPageContent,
        isRefreshPageContentPending,
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
                        highlighted: false,
                        to: '/management/groups',
                        label: 'Groups',
                    },
                    {
                        highlighted: false,
                        to: `/management/groups/${groupCode}/details`,
                        label: groupDetails?.name || groupCode,
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

export default EditGroupHeaderComponent;
