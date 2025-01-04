import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbPencil } from 'react-icons/tb';
import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllQuotasHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    quotasLength: number;
    setIsAlterQuotasModalOpen: (isOpen: boolean) => void;
    setQuotaEntryToAlter: (quota: any) => void;
    isAuthorizedAlterQuota: boolean;
}

function renderTitle(
    clusterCode,
    refreshPageContent,
    isRefreshPageContentPending,
    quotasLength,
    setIsAlterQuotasModalOpen,
    setQuotaEntryToAlter,
    isAuthorizedAlterQuota,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Quotas"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Quotas">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(quotasLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedAlterQuota && (
                <div className="flex items-center">
                    <Button
                        onClick={() => {
                            setQuotaEntryToAlter(null);
                            setIsAlterQuotasModalOpen(true);
                        }}
                        leftIcon={<TbPencil size="1.4rem" />}
                    >
                        Alter Quota
                    </Button>
                </div>
            )}
        </div>
    );
}

function AllQuotasHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    quotasLength,
    setIsAlterQuotasModalOpen,
    setQuotaEntryToAlter,
    isAuthorizedAlterQuota,
}: AllQuotasHeaderComponentProps) {
    const { clusterCode } = useParams();

    const title = renderTitle(
        clusterCode,
        refreshPageContent,
        isRefreshPageContentPending,
        quotasLength,
        setIsAlterQuotasModalOpen,
        setQuotaEntryToAlter,
        isAuthorizedAlterQuota,
    );
    return (
        <>
            <CommonTitle
                breadCrumbItems={[
                    {
                        highlighted: false,
                        to: '/clusters',
                        label: 'Clusters',
                    },
                    {
                        highlighted: false,
                        to: `/clusters/${clusterCode}/dashboard`,
                        label: clusterCode,
                    },
                    {
                        highlighted: true,
                        label: 'Quotas',
                    },
                ]}
                title={title}
            />
        </>
    );
}

export default AllQuotasHeaderComponent;
