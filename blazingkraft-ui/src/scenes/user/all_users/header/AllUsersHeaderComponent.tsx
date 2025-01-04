import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbCirclePlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllUsersHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    usersLength: number;
    isAuthorizedCreateUser: boolean;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    usersLength,
    isAuthorizedCreateUser,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Users"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of Users">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                ({CommonUtils.beautifyNumber(usersLength)})
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateUser && (
                <Button
                    component={Link}
                    to="/management/users/create"
                    leftIcon={<TbCirclePlus size={22} />}
                >
                    Create User
                </Button>
            )}
        </div>
    );
}

function AllUsersHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    usersLength,
    isAuthorizedCreateUser,
}: AllUsersHeaderComponentProps) {
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        usersLength,
        isAuthorizedCreateUser,
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
                    label: 'Users',
                },
            ]}
            title={title}
        />
    );
}

export default AllUsersHeaderComponent;
