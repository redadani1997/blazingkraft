import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { TbCirclePlus } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import CreateKsqlDbConnector from 'scenes/ksqldb_ecosystem/create_ksqldb_connector/CreateKsqlDbConnector';

interface AllKsqlDbConnectorsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    ksqlDbConnectorsLength: number;
    isAuthorizedKsqlDbCreateConnector: boolean;
}

function renderTitle(
    ksqlDbCode,
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbConnectorsLength,
    setIsCreateModalOpen,
    isAuthorizedKsqlDbCreateConnector,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Connectors"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Connectors">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    ksqlDbConnectorsLength,
                                )}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedKsqlDbCreateConnector && (
                <div className="flex items-center">
                    <Button
                        onClick={() => setIsCreateModalOpen(true)}
                        leftIcon={<TbCirclePlus size={22} />}
                    >
                        Create Connector
                    </Button>
                </div>
            )}
        </div>
    );
}

function AllKsqlDbConnectorsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbConnectorsLength,
    isAuthorizedKsqlDbCreateConnector,
}: AllKsqlDbConnectorsHeaderComponentProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

    const { ksqlDbCode } = useParams();
    const title = renderTitle(
        ksqlDbCode,
        refreshPageContent,
        isRefreshPageContentPending,
        ksqlDbConnectorsLength,
        setIsCreateModalOpen,
        isAuthorizedKsqlDbCreateConnector,
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
                        label: 'Connectors',
                    },
                ]}
                title={title}
            />
            <CreateKsqlDbConnector
                isModalOpen={isCreateModalOpen}
                setIsModalOpen={setIsCreateModalOpen}
                refreshPageContent={refreshPageContent}
            />
        </>
    );
}

export default AllKsqlDbConnectorsHeaderComponent;
