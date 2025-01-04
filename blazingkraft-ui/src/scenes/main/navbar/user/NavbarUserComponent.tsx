import {
    Avatar,
    Box,
    Group,
    Text,
    UnstyledButton,
    rem,
    useMantineTheme,
} from '@mantine/core';
import { ConnectedUser } from 'scenes/login/redux';

interface NavbarUserComponentProps {
    connectedUser: ConnectedUser;
    opened: boolean;
}

const NavbarUserComponent = ({
    connectedUser,
    opened,
}: NavbarUserComponentProps) => {
    const theme = useMantineTheme();

    return (
        <Box
            sx={{
                borderTop: `${rem(1)} solid ${
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[4]
                        : theme.colors.gray[2]
                }`,
            }}
        >
            <div className={opened ? 'p-2' : 'p-2'}>
                <UnstyledButton
                    sx={{
                        display: 'block',
                        width: '100%',
                        borderRadius: theme.radius.sm,
                        padding: 0,
                        color:
                            theme.colorScheme === 'dark'
                                ? theme.colors.dark[0]
                                : theme.black,
                    }}
                >
                    <Group
                        className={opened ? 'p-2' : 'p-2'}
                        position="apart"
                        spacing={0}
                        sx={{
                            '&:hover': {
                                backgroundColor:
                                    theme.colorScheme === 'dark'
                                        ? theme.colors.dark[5]
                                        : theme.colors.gray[2],
                            },
                            backgroundColor:
                                theme.colorScheme === 'dark'
                                    ? theme.colors.dark[6]
                                    : theme.colors.gray[0],
                        }}
                    >
                        <Box className="flex items-center w-full">
                            {connectedUser.picture ? (
                                <Avatar
                                    size={30}
                                    color="blue"
                                    src={connectedUser.picture}
                                    radius="xl"
                                />
                            ) : (
                                <Avatar size={30} color="blue" radius="xl">
                                    {connectedUser.displayedName
                                        ? connectedUser.displayedName[0].toUpperCase()
                                        : ''}
                                </Avatar>
                            )}
                            <div className="flex flex-col pl-4 w-full common-elipsis flex-1">
                                <Text
                                    size="sm"
                                    weight={500}
                                    className="italic w-full"
                                >
                                    <Box className="common-elipsis">
                                        {connectedUser.displayedName ||
                                            'No Displayed Name'}
                                    </Box>
                                </Text>
                                <Text
                                    color="dimmed"
                                    size="xs"
                                    className="common-elipsis"
                                >
                                    {connectedUser.identifier ||
                                        'No Identifier'}
                                </Text>
                            </div>
                        </Box>
                    </Group>
                </UnstyledButton>
            </div>
        </Box>
    );
};

export default NavbarUserComponent;
