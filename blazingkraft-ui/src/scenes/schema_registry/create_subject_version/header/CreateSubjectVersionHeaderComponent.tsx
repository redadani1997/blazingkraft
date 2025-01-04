import { Text, Tooltip } from '@mantine/core';
import { SubjectDetails } from 'common/types/schema_registry';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface CreateSubjectVersionComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    subjectDetails?: SubjectDetails;
}

function renderTitle(
    schemaRegistryCode,
    refreshPageContent,
    isRefreshPageContentPending,
    subjectDetails: SubjectDetails | undefined,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Subject Version Creation"
                subLabel={
                    <div className="flex font-semibold">
                        <Tooltip label="Compatibility">
                            <Text className="pl-2" color="dimmed" size="xs">
                                {subjectDetails?.compatibility}
                            </Text>
                        </Tooltip>
                        <Tooltip label="Mode">
                            <Text className="pl-2" color="dimmed" size="xs">
                                {subjectDetails?.mode}
                            </Text>
                        </Tooltip>
                        <Tooltip label="Schema Type">
                            <Text className="pl-2" color="dimmed" size="xs">
                                {subjectDetails?.schemasMetaData[0]?.schemaType}
                            </Text>
                        </Tooltip>
                    </div>
                }
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
        </div>
    );
}

function CreateSubjectVersionComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    subjectDetails,
}: CreateSubjectVersionComponentProps) {
    const { schemaRegistryCode, subject } = useParams();
    const title = renderTitle(
        schemaRegistryCode,
        refreshPageContent,
        isRefreshPageContentPending,
        subjectDetails,
    );
    return (
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
                    highlighted: false,
                    to: `/schema_registries/${schemaRegistryCode}/subjects`,
                    label: 'Subjects',
                },
                {
                    highlighted: false,
                    to: `/schema_registries/${schemaRegistryCode}/subjects/${subject}/versions`,
                    label: subject,
                },
                {
                    highlighted: true,
                    label: 'Version Creation',
                },
            ]}
            title={title}
        />
    );
}

export default CreateSubjectVersionComponent;
