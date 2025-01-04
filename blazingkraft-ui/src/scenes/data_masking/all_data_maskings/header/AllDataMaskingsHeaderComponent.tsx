import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useState } from 'react';
import { TbCirclePlus } from 'react-icons/tb';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import CreateDataMasking from 'scenes/data_masking/create_data_masking/CreateDataMasking';

interface AllDataMaskingsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    dataMaskingsLength: number;
    isAuthorizedCreateDataMasking: boolean;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    dataMaskingsLength,
    setIsCreateModalOpen,
    isAuthorizedCreateDataMasking,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Data Masking Rules"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Data Masking Rules">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(dataMaskingsLength)}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateDataMasking && (
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    leftIcon={<TbCirclePlus size={22} />}
                >
                    Create Data Masking Rule
                </Button>
            )}
        </div>
    );
}

function AllDataMaskingsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    dataMaskingsLength,
    isAuthorizedCreateDataMasking,
}: AllDataMaskingsHeaderComponentProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        dataMaskingsLength,
        setIsCreateModalOpen,
        isAuthorizedCreateDataMasking,
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
                        highlighted: true,
                        label: 'Data Masking',
                    },
                ]}
                title={title}
            />
            <CreateDataMasking
                isModalOpen={isCreateModalOpen}
                setIsModalOpen={setIsCreateModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllDataMaskingsHeaderComponent;
