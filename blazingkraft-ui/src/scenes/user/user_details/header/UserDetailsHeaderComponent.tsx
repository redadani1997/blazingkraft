import { Menu } from '@mantine/core';
import { useState } from 'react';
import { IoArrowDownCircleOutline } from 'react-icons/io5';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';
import DeleteUser from 'scenes/user/delete_user/DeleteUser';
import EditUserPassword from 'scenes/user/edit_user_password/EditUserPassword';
import EditUserPasswordWithoutCurrent from 'scenes/user/edit_user_password_without_current/EditUserPasswordWithoutCurrent';

interface UserDetailsHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    isAuthorizedEditUser: boolean;
    isAuthorizedEditUserPassword: boolean;
    isAuthorizedEditUserPasswordWithoutCurrent: boolean;
    isAuthorizedDeleteUser: boolean;
}

function renderAdditionalActions(
    userEmail,
    setIsDeleteUserModalOpen,
    setIsEditUserPasswordModalOpen,
    setIsEditUserPasswordWithoutCurrentModalOpen,
    isAuthorizedEditUser: boolean,
    isAuthorizedEditUserPassword: boolean,
    isAuthorizedEditUserPasswordWithoutCurrent: boolean,
    isAuthorizedDeleteUser: boolean,
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
                {(isAuthorizedEditUser || isAuthorizedEditUserPassword) && (
                    <Menu.Label>Soft Zone</Menu.Label>
                )}
                {isAuthorizedEditUser && (
                    <Menu.Item
                        component={Link}
                        to={`/management/users/${userEmail}/edit`}
                        icon={<TbPencil size="1rem" />}
                    >
                        Edit User Details
                    </Menu.Item>
                )}
                {isAuthorizedEditUserPassword && (
                    <Menu.Item
                        icon={<TbPencil size="1rem" />}
                        onClick={() => {
                            setIsEditUserPasswordModalOpen(true);
                        }}
                    >
                        Edit User Password
                    </Menu.Item>
                )}

                {(isAuthorizedEditUser || isAuthorizedEditUserPassword) && (
                    <Menu.Divider />
                )}

                {(isAuthorizedDeleteUser ||
                    isAuthorizedEditUserPasswordWithoutCurrent) && (
                    <Menu.Label>Danger Zone</Menu.Label>
                )}
                {isAuthorizedDeleteUser && (
                    <Menu.Item
                        color="red"
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsDeleteUserModalOpen(true);
                        }}
                    >
                        Delete User
                    </Menu.Item>
                )}
                {isAuthorizedEditUserPasswordWithoutCurrent && (
                    <Menu.Item
                        color="red"
                        icon={<TbTrash size="1rem" />}
                        onClick={() => {
                            setIsEditUserPasswordWithoutCurrentModalOpen(true);
                        }}
                    >
                        Edit User Password Without Verification
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
function renderTitle(
    userEmail,
    refreshPageContent,
    isRefreshPageContentPending,
    setIsDeleteUserModalOpen,
    setIsEditUserPasswordModalOpen,
    setIsEditUserPasswordWithoutCurrentModalOpen,
    isAuthorizedEditUser: boolean,
    isAuthorizedEditUserPassword: boolean,
    isAuthorizedEditUserPasswordWithoutCurrent: boolean,
    isAuthorizedDeleteUser: boolean,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label={userEmail}
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
            />
            {(isAuthorizedEditUser ||
                isAuthorizedEditUserPassword ||
                isAuthorizedEditUserPasswordWithoutCurrent ||
                isAuthorizedDeleteUser) &&
                renderAdditionalActions(
                    userEmail,
                    setIsDeleteUserModalOpen,
                    setIsEditUserPasswordModalOpen,
                    setIsEditUserPasswordWithoutCurrentModalOpen,
                    isAuthorizedEditUser,
                    isAuthorizedEditUserPassword,
                    isAuthorizedEditUserPasswordWithoutCurrent,
                    isAuthorizedDeleteUser,
                )}
        </div>
    );
}

function UserDetailsHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    isAuthorizedEditUser,
    isAuthorizedEditUserPassword,
    isAuthorizedEditUserPasswordWithoutCurrent,
    isAuthorizedDeleteUser,
}: UserDetailsHeaderComponentProps) {
    const navigate = useNavigate();
    const { userEmail } = useParams();
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
    const [isEditUserPasswordModalOpen, setIsEditUserPasswordModalOpen] =
        useState(false);
    const [
        isEditUserPasswordWithoutCurrentModalOpen,
        setIsEditUserPasswordWithoutCurrentModalOpen,
    ] = useState(false);

    const title = renderTitle(
        userEmail,
        refreshPageContent,
        isRefreshPageContentPending,
        setIsDeleteUserModalOpen,
        setIsEditUserPasswordModalOpen,
        setIsEditUserPasswordWithoutCurrentModalOpen,
        isAuthorizedEditUser,
        isAuthorizedEditUserPassword,
        isAuthorizedEditUserPasswordWithoutCurrent,
        isAuthorizedDeleteUser,
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
                        to: '/management/users',
                        label: 'Users',
                    },
                    {
                        highlighted: true,
                        label: 'Details',
                    },
                ]}
                title={title}
            />
            <DeleteUser
                setIsModalOpen={setIsDeleteUserModalOpen}
                isModalOpen={isDeleteUserModalOpen}
                onSuccess={() => navigate('/management/users')}
                userToDelete={userEmail}
            />
            <EditUserPassword
                setIsModalOpen={setIsEditUserPasswordModalOpen}
                isModalOpen={isEditUserPasswordModalOpen}
            />
            <EditUserPasswordWithoutCurrent
                setIsModalOpen={setIsEditUserPasswordWithoutCurrentModalOpen}
                isModalOpen={isEditUserPasswordWithoutCurrentModalOpen}
            />
        </>
    );
}

export default UserDetailsHeaderComponent;
