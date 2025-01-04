import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface EditSchemaRegistryHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
}

function renderTitle(refreshPageContent, isRefreshPageContentPending) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Schema Registry Edit"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function EditSchemaRegistryHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
}: EditSchemaRegistryHeaderComponentProps) {
    const { schemaRegistryCode } = useParams();

    const title = renderTitle(refreshPageContent, isRefreshPageContentPending);
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/schema_registries',
                        label: 'Schema Registries',
                    },
                    {
                        highlighted: false,
                        to: `/schema_registries/${schemaRegistryCode}/dashboard`,
                        label: schemaRegistryCode,
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

export default EditSchemaRegistryHeaderComponent;
