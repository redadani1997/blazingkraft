import { Box, Group, UnstyledButton, createStyles } from '@mantine/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ActiveLink, COMMON_ROUTE_ID, COMMON_ROUTE_TYPE } from '..';

const useStyles = createStyles(theme => ({
    control: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
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
}));

interface CommonNavbarLinkProps {
    activeLink: ActiveLink;
    id: COMMON_ROUTE_ID;
    type?: COMMON_ROUTE_TYPE;
    link?: string;
    onClick?: () => void;
    name: string;
    icon: React.ReactNode;
}

function WithLink({
    children,
    link,
}: {
    children: React.ReactNode;
    link?: string;
}) {
    if (link) {
        return (
            <Link to={link} className="no-underline">
                {children}
            </Link>
        );
    } else {
        return <>{children}</>;
    }
}

function CommonNavbarLink({
    activeLink,
    icon,
    id,
    type,
    link,
    onClick,
    name,
}: CommonNavbarLinkProps) {
    const { classes, theme } = useStyles();

    return (
        <div className="px-2 py-2" key={id}>
            <WithLink link={link}>
                <UnstyledButton
                    onClick={onClick}
                    className={classNames(classes.control, 'p-0')}
                >
                    <Group
                        position="apart"
                        spacing={0}
                        className="p-2 rounded"
                        style={
                            activeLink.id === id &&
                            (type === undefined || activeLink.type === type)
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
                        <Box className="flex items-center w-full">
                            {icon}
                            <Box ml="md" className="flex-1 common-elipsis">
                                {name}
                            </Box>
                        </Box>
                    </Group>
                </UnstyledButton>
            </WithLink>
        </div>
    );
}

export default CommonNavbarLink;
