import { Alert, Button, Grid, Text } from '@mantine/core';
import { TbAlertTriangle, TbPencil, TbX } from 'react-icons/tb';
import { useParams } from 'react-router';
import CommonPasswordInput from 'scenes/common/input/CommonPasswordInput';
import CommonModal from 'scenes/common/modal/CommonModal';
import WithRequirements from 'scenes/common/requirement/WithRequirements';
import useEditUserPassword from './hooks/useEditUserPassword';

interface EditUserPasswordComponentProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
    editUserPassword: (
        currentPassword,
        password,
        passwordConfirm,
    ) => Promise<any>;
    isEditUserPasswordPending: boolean;
}

function renderModalBody(
    isPasswordValid,
    password,
    passwordConfirm,
    currentPassword,
    setPassword,
    setPasswordConfirm,
    setCurrentPassword,
    passwordRequirements,
) {
    return (
        <>
            <Grid className="mb-2">
                <Grid.Col span={12}>
                    <CommonPasswordInput
                        placeholder="Current Password"
                        label="Current Password"
                        value={currentPassword}
                        onChange={setCurrentPassword}
                    />
                </Grid.Col>
            </Grid>
            <Grid className="mb-2">
                <Grid.Col span={12} md={6}>
                    <WithRequirements requirements={passwordRequirements}>
                        <CommonPasswordInput
                            placeholder="Password"
                            label="Password"
                            value={password}
                            onChange={setPassword}
                            error={!isPasswordValid}
                        />
                    </WithRequirements>
                </Grid.Col>
                <Grid.Col span={12} md={6}>
                    <WithRequirements requirements={passwordRequirements}>
                        <CommonPasswordInput
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            value={passwordConfirm}
                            onChange={setPasswordConfirm}
                            error={!isPasswordValid}
                        />
                    </WithRequirements>
                </Grid.Col>
            </Grid>
            <Alert
                icon={<TbAlertTriangle size="1.4rem" />}
                title="Confirmation"
                color="lime"
            >
                <Text>Please confirm User Password Edit.</Text>
            </Alert>
        </>
    );
}

function renderModalFooter(setIsModalOpen, action, isPasswordValid) {
    return (
        <div className="flex justify-between">
            <Button
                color="blue"
                variant="outline"
                leftIcon={<TbX size="1rem" />}
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </Button>
            <Button
                color="blue"
                leftIcon={<TbPencil size="1rem" />}
                onClick={() => action()}
                disabled={!isPasswordValid}
            >
                Edit
            </Button>
        </div>
    );
}

function EditUserPasswordComponent({
    setIsModalOpen,
    isModalOpen,
    isEditUserPasswordPending,
    editUserPassword,
}: EditUserPasswordComponentProps) {
    const { userEmail } = useParams();

    const {
        currentPassword,
        isPasswordValid,
        password,
        passwordConfirm,
        passwordRequirements,
        setCurrentPassword,
        setPassword,
        setPasswordConfirm,
    } = useEditUserPassword();

    const action = () =>
        editUserPassword(currentPassword, password, passwordConfirm);

    const modalBody = renderModalBody(
        isPasswordValid,
        password,
        passwordConfirm,
        currentPassword,
        setPassword,
        setPasswordConfirm,
        setCurrentPassword,
        passwordRequirements,
    );
    const modalFooter = renderModalFooter(
        setIsModalOpen,
        action,
        isPasswordValid,
    );

    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center break-all">
                    <Text className="pr-2">Edit User Password</Text>
                    <Text color="dimmed" size="xs">
                        {userEmail}
                    </Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
            modalFooter={modalFooter}
            isLoading={isEditUserPasswordPending}
        />
    );
}

export default EditUserPasswordComponent;
