import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbCirclePlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllClustersHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    ksqlDbsLength: number;
    isAuthorizedCreateKsqlDb: boolean;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbsLength,
    isAuthorizedCreateKsqlDb,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="KsqlDbs"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of KsqlDbs">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(ksqlDbsLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateKsqlDb && (
                <Button
                    component={Link}
                    to="/ksqldbs/create"
                    leftIcon={<TbCirclePlus size={22} />}
                >
                    Create KsqlDb
                </Button>
            )}
        </div>
    );
}

function AllClustersHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    ksqlDbsLength,
    isAuthorizedCreateKsqlDb,
}: AllClustersHeaderComponentProps) {
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        ksqlDbsLength,
        isAuthorizedCreateKsqlDb,
    );
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'KsqlDbs',
                },
            ]}
            title={title}
        />
    );
}

export default AllClustersHeaderComponent;
