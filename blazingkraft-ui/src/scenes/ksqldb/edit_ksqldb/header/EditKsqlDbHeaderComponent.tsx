import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface EditKsqlDbHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(
    ksqlDbCode,
    refreshPageContent,
    isRefreshPageContentPending,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="KsqlDb Edit"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function EditKsqlDbHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: EditKsqlDbHeaderComponentProps) {
    const { ksqlDbCode } = useParams();

    const title = renderTitle(
        ksqlDbCode,
        refreshPageContent,
        isRefreshPageContentPending,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/ksqldbs',
                        label: 'KsqlDbs',
                    },
                    {
                        highlighted: false,
                        to: `/ksqldbs/${ksqlDbCode}/dashboard`,
                        label: ksqlDbCode,
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

export default EditKsqlDbHeaderComponent;
