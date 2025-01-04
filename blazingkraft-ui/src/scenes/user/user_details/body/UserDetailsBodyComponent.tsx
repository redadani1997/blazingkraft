import { Grid, Text } from '@mantine/core';
import { UserDetails } from 'common/types/user';
import CommonCopy from 'scenes/common/copy/CommonCopy';
import CommonTextInput from 'scenes/common/input/CommonTextInput';
import CommonSelect from 'scenes/common/select/CommonSelect';

interface CreateUserBodyComponentProps {
    userDetails: UserDetails;
}

const CreateUserBodyComponent = ({
    userDetails,
}: CreateUserBodyComponentProps) => {
    const groupOptions = [
        {
            label: userDetails.groupName,
            value: userDetails.groupCode,
        },
    ];

    return (
        <div className="flex flex-col">
            <Grid className="flex items-end mb-2">
                <Grid.Col span={12} md={10} lg={8}>
                    <CommonTextInput
                        wrapperClassName="w-full"
                        placeholder="Email"
                        label={
                            <Text className="flex items-center">
                                Email
                                <CommonCopy
                                    text={userDetails.email}
                                    actionIconClassName="pl-2"
                                />
                            </Text>
                        }
                        value={userDetails.email}
                        disabled
                    />
                </Grid.Col>
            </Grid>
            <Grid className="mb-2">
                <Grid.Col span={12} md={5} lg={4}>
                    <CommonTextInput
                        placeholder="First Name"
                        label={
                            <Text className="flex items-center">
                                First Name
                                <CommonCopy
                                    text={userDetails.firstName}
                                    actionIconClassName="pl-2"
                                />
                            </Text>
                        }
                        value={userDetails.firstName}
                        disabled
                    />
                </Grid.Col>
                <Grid.Col span={12} md={5} lg={4}>
                    <CommonTextInput
                        placeholder="Last Name"
                        label={
                            <Text className="flex items-center">
                                Last Name
                                <CommonCopy
                                    text={userDetails.lastName}
                                    actionIconClassName="pl-2"
                                />
                            </Text>
                        }
                        value={userDetails.lastName}
                        disabled
                    />
                </Grid.Col>
            </Grid>
            <Grid className="mb-2">
                <Grid.Col span={12} md={5} lg={4}>
                    <CommonSelect
                        placeholder="Group"
                        label="Group"
                        value={userDetails.groupCode}
                        data={groupOptions}
                        disabled
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default CreateUserBodyComponent;
