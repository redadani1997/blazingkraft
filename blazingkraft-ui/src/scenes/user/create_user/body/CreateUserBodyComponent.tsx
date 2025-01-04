import { Grid } from '@mantine/core';
import { GroupMeta } from 'common/types/group';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonPasswordInput from 'scenes/common/input/CommonPasswordInput';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import WithRequirements from 'scenes/common/requirement/WithRequirements';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { UserCreateRequest } from 'scenes/user/redux/actions';
import useCreateUser from './hooks/useCreateUser';

interface CreateUserBodyComponentProps {
    createUser: (request: UserCreateRequest) => void;
    groups: GroupMeta[];
    isGetAllGroupsPending: boolean;
}

const CreateUserBodyComponent = ({
    createUser,
    isGetAllGroupsPending,
    groups,
}: CreateUserBodyComponentProps) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        groupCode,
        setGroupCode,
        emailRequirements,
        passwordRequirements,
        firstNameRequirements,
        lastNameRequirements,
        isEmailValid,
        isPasswordValid,
        isFirstNameValid,
        isLastNameValid,
    } = useCreateUser();

    function doCreate() {
        createUser({
            email,
            password,
            passwordConfirm,
            firstName,
            lastName,
            groupCode,
        });
    }

    const groupOptions = groups.map(group => ({
        label: group.name,
        value: group.code,
    }));

    return (
        <div className="flex flex-col">
            <Grid className="flex items-end">
                <Grid.Col span={12} md={6} lg={4}>
                    <WithRequirements requirements={emailRequirements}>
                        <CommonTextInput
                            wrapperClassName="w-full"
                            placeholder="Email"
                            label="Email"
                            value={email}
                            onChange={setEmail}
                            error={!isEmailValid}
                        />
                    </WithRequirements>
                </Grid.Col>
                <Grid.Col span={12} md={4} lg={4}>
                    <CommonButton
                        disabled={
                            !isEmailValid ||
                            !isPasswordValid ||
                            !isFirstNameValid ||
                            !isLastNameValid ||
                            !groupCode
                        }
                        onClick={doCreate}
                    >
                        Create
                    </CommonButton>
                </Grid.Col>
            </Grid>
            <Grid className="my-2">
                <Grid.Col span={12} md={5} lg={4}>
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
                <Grid.Col span={12} md={5} lg={4}>
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
            <Grid className="mb-2">
                <Grid.Col span={12} md={5} lg={4}>
                    <WithRequirements requirements={firstNameRequirements}>
                        <CommonTextInput
                            placeholder="First Name"
                            label="First Name"
                            value={firstName}
                            onChange={setFirstName}
                            error={!isFirstNameValid}
                        />
                    </WithRequirements>
                </Grid.Col>
                <Grid.Col span={12} md={5} lg={4}>
                    <WithRequirements requirements={lastNameRequirements}>
                        <CommonTextInput
                            placeholder="Last Name"
                            label="Last Name"
                            value={lastName}
                            onChange={setLastName}
                            error={!isLastNameValid}
                        />
                    </WithRequirements>
                </Grid.Col>
            </Grid>
            <Grid className="mb-2">
                <Grid.Col span={12} md={5} lg={4}>
                    <CommonSelect
                        placeholder="Group"
                        label="Group"
                        value={groupCode}
                        onChange={setGroupCode}
                        data={groupOptions}
                        loading={isGetAllGroupsPending}
                        error={!groupCode}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default CreateUserBodyComponent;
