import { Grid } from '@mantine/core';
import { GroupMeta } from 'common/types/group';
import { UserDetails } from 'common/types/user';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import WithRequirements from 'scenes/common/requirement/WithRequirements';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { UserEditRequest } from 'scenes/user/redux/actions';
import useEditUser from './hooks/useEditUser';

interface EditUserBodyComponentProps {
    editUser: (request: UserEditRequest) => void;
    groups: GroupMeta[];
    isGetAllGroupsPending: boolean;
    userDetails: UserDetails;
}

const EditUserBodyComponent = ({
    editUser,
    userDetails,
    isGetAllGroupsPending,
    groups,
}: EditUserBodyComponentProps) => {
    const {
        email,
        setEmail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        groupCode,
        setGroupCode,
        emailRequirements,
        firstNameRequirements,
        lastNameRequirements,
        isEmailValid,
        isFirstNameValid,
        isLastNameValid,
    } = useEditUser({ userDetails });

    function doEdit() {
        editUser({
            email,
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
            <Grid className="flex items-end mb-2">
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
                            !isFirstNameValid ||
                            !isLastNameValid
                        }
                        onClick={doEdit}
                    >
                        Edit
                    </CommonButton>
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

export default EditUserBodyComponent;
