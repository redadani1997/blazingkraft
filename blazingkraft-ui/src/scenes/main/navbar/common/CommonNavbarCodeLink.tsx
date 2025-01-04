import {
    Box,
    Collapse,
    ColorSwatch,
    Group,
    UnstyledButton,
    createStyles,
} from '@mantine/core';
import classNames from 'classnames';
import { TbChevronDown, TbChevronUp } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { ActiveLink, COMMON_ROUTE_ID, CodeLink, OpenedLink } from '..';

interface CommonNavbarCodeLinkProps {
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    id: COMMON_ROUTE_ID;
    code: string;
    name: string;
    color: string;
    setOpenedLink: (openedLink: OpenedLink) => void;
    items: CodeLink[];
}

const useStyles = createStyles(theme => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        paddingLeft: 3,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        borderLeft: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },
}));

function CommonNavbarCodeLink({
    activeLink,
    openedLink,
    id,
    code,
    name,
    color,
    setOpenedLink,
    items,
}: CommonNavbarCodeLinkProps) {
    const { classes, theme } = useStyles();

    return (
        <div className="p-2" key={code}>
            <UnstyledButton
                onClick={() => {
                    if (openedLink?.id === id && openedLink?.code === code) {
                        setOpenedLink(undefined);
                    } else {
                        setOpenedLink({
                            id,
                            code,
                        });
                    }
                }}
                className={classNames(classes.control, 'p-0')}
            >
                <Group
                    position="apart"
                    spacing={0}
                    className="p-2 rounded"
                    style={
                        activeLink.id === id && activeLink.code === code
                            ? {
                                  backgroundColor:
                                      theme.colorScheme === 'dark'
                                          ? theme.colors.dark[5]
                                          : theme.colors.blue[1],

                                  transition: 'background-color 500ms linear',
                              }
                            : {
                                  transition: 'background-color 500ms linear',
                                  backgroundColor: 'inherit',
                              }
                    }
                >
                    <Box className="flex items-center w-full">
                        <ColorSwatch
                            component="div"
                            color={color}
                            size="1.7rem"
                        >
                            {/* {code ? code[0].toUpperCase() : ''} */}
                        </ColorSwatch>
                        {/* <Avatar
                            color={color}
                            radius="xl"
                            size={30}
                            className="w-auto"
                        >
                            {code ? code[0].toUpperCase() : ''}
                        </Avatar> */}
                        <div className="flex justify-between flex-1 items-center common-elipsis">
                            <Box ml="xs" className="flex-1 common-elipsis">
                                {name}
                            </Box>
                            <div className="w-auto">
                                {openedLink &&
                                openedLink.code === code &&
                                openedLink.id === id ? (
                                    <TbChevronDown size="1rem" />
                                ) : (
                                    <TbChevronUp size="1rem" />
                                )}
                            </div>
                        </div>
                    </Box>
                </Group>
            </UnstyledButton>
            <Collapse
                in={
                    openedLink &&
                    openedLink.code === code &&
                    openedLink.id === id
                }
                className="pt-1"
            >
                {items.map(item => (
                    <Link
                        to={item.link}
                        className={classes.link}
                        key={`${item.link}_${item.type}`}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            className="p-2 rounded"
                            style={
                                activeLink.id === id &&
                                activeLink.code === code &&
                                activeLink.type === item.type
                                    ? {
                                          backgroundColor:
                                              theme.colorScheme === 'dark'
                                                  ? theme.colors.dark[5]
                                                  : theme.colors.blue[1],

                                          transition:
                                              'background-color 500ms linear',
                                      }
                                    : {
                                          transition:
                                              'background-color 500ms linear',
                                          backgroundColor: 'inherit',
                                      }
                            }
                        >
                            {item.icon}
                            <Box ml="md" className="break-words">
                                {item.name}
                            </Box>
                        </Box>
                    </Link>
                ))}
            </Collapse>
        </div>
    );
}

export default CommonNavbarCodeLink;
