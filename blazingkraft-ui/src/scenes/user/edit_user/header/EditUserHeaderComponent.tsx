import { UserDetails } from 'common/types/user';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface EditUserHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    userDetails: UserDetails;
}

function renderTitle(
    userEmail,
    refreshPageContent,
    isRefreshPageContentPending,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={userEmail}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function EditUserHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: EditUserHeaderComponentProps) {
    const { userEmail } = useParams();

    const title = renderTitle(
        userEmail,
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
                        to: '/management/users',
                        label: 'Users',
                    },
                    {
                        highlighted: false,
                        to: `/management/users/${userEmail}/details`,
                        label: userEmail,
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

export default EditUserHeaderComponent;
