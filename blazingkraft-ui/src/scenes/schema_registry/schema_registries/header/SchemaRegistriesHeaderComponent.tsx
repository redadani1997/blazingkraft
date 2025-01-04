import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbCirclePlus } from 'react-icons/tb';
import { Link, useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface SchemaRegistriesComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    schemaRegistiesLength: number;
    isAuthorizedCreateSchemaRegistry: boolean;
}

function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    schemaRegistiesLength,
    isAuthorizedCreateSchemaRegistry,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Schema Registries"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Schema Registries">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    schemaRegistiesLength,
                                )}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateSchemaRegistry && (
                <Button
                    component={Link}
                    to={'/schema_registries/create'}
                    leftIcon={<TbCirclePlus size={22} />}
                >
                    Create Schema Registry
                </Button>
            )}
        </div>
    );
}

function SchemaRegistriesComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    schemaRegistiesLength,
    isAuthorizedCreateSchemaRegistry,
}: SchemaRegistriesComponentProps) {
    const { clusterCode } = useParams();
    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        schemaRegistiesLength,
        isAuthorizedCreateSchemaRegistry,
    );
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Schema Registries',
                },
            ]}
            title={title}
        />
    );
}

export default SchemaRegistriesComponent;
