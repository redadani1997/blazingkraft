import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbCirclePlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllGroupsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    groupsLength: number;
    isAuthorizedCreateGroup: boolean;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    groupsLength,
    isAuthorizedCreateGroup,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Groups"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Groups">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(groupsLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateGroup && (
                <Button
                    component={Link}
                    to="/management/groups/create"
                    leftIcon={<TbCirclePlus size={22} />}
                >
                    Create Group
                </Button>
            )}
        </div>
    );
}

function AllGroupsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    groupsLength,
    isAuthorizedCreateGroup,
}: AllGroupsHeaderComponentProps) {
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        groupsLength,
        isAuthorizedCreateGroup,
    );
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Management',
                },
                {
                    highlighted: true,
                    label: 'Groups',
                },
            ]}
            title={title}
        />
    );
}

export default AllGroupsHeaderComponent;
