import { Menu } from '@mantine/core';
import { GroupDetails } from 'common/types/group';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DeleteGroup from 'scenes/group/delete_group/DeleteGroup';

interface GroupDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    groupDetails: GroupDetails;
    isAuthorizedDeleteGroup: boolean;
    isAuthorizedEditGroup: boolean;
}

function renderAdditionalActions(
    groupCode,
    setIsDeleteGroupModalOpen,
    isAuthorizedDeleteGroup,
    isAuthorizedEditGroup,
) {
    return (
        <Menu shadow="md" width={280}>
            <Menu.Target>
                <div className="w-auto">
                    <CommonButton
                        variant="outline"
                        color="blue"
                        leftIcon={<IoArrowDownCircleOutline size="1.4rem" />}
                    >
                        Actions
                    </CommonButton>
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                {isAuthorizedEditGroup && (
                    <>
                        <Menu.Label>Soft Zone</Menu.Label>
                        <Menu.Item
                            component={Link}
                            to={`/management/groups/${groupCode}/edit`}
                            icon={<TbPencil size="1rem" />}
                        >
                            Edit Group
                        </Menu.Item>

                        <Menu.Divider />
                    </>
                )}

                {isAuthorizedDeleteGroup && (
                    <>
                        <Menu.Label>Danger Zone</Menu.Label>
                        <Menu.Item
                            color="red"
                            icon={<TbTrash size="1rem" />}
                            onClick={() => {
                                setIsDeleteGroupModalOpen(true);
                            }}
                        >
                            Delete Group
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    groupDetails: GroupDetails,
    groupCode,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsDeleteGroupModalOpen,
    isAuthorizedDeleteGroup,
    isAuthorizedEditGroup,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={groupDetails?.name || groupCode}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedEditGroup || isAuthorizedDeleteGroup) &&
                renderAdditionalActions(
                    groupCode,
                    setIsDeleteGroupModalOpen,
                    isAuthorizedDeleteGroup,
                    isAuthorizedEditGroup,
                )}
        </div>
    );
}

function GroupDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    groupDetails,
    isAuthorizedDeleteGroup,
    isAuthorizedEditGroup,
}: GroupDetailsHeaderComponentProps) {
    const navigate = useNavigate();
    const { groupCode } = useParams();
    const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);

    const title = renderTitle(
        groupDetails,
        groupCode,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsDeleteGroupModalOpen,
        isAuthorizedDeleteGroup,
        isAuthorizedEditGroup,
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
                        highlighted: false,
                        to: '/management/groups',
                        label: 'Groups',
                    },
                    {
                        highlighted: true,
                        label: 'Details',
                    },
                ]}
                title={title}
            />
            <DeleteGroup
                groupToDelete={
                    groupDetails
                        ? {
                              code: groupDetails.code,
                              name: groupDetails.name,
                              description: groupDetails.description,
                              numberOfUsers:
                                  groupDetails.usersMeta?.length || 0,
                          }
                        : null
                }
                setIsModalOpen={setIsDeleteGroupModalOpen}
                isModalOpen={isDeleteGroupModalOpen}
                onSuccess={() => navigate('/management/groups')}
            />
        </>
    );
}

export default GroupDetailsHeaderComponent;
