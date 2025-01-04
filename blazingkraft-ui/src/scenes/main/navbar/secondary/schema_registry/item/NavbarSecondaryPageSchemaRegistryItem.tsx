import { SchemaRegistryDashboardPermissions } from 'common/permissions/schema_registry/SchemaRegistryDashboardPermissions';
import { SubjectPermissions } from 'common/permissions/schema_registry/SubjectPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActiveLink, OpenedLink } from 'scenes/main/navbar';
import NavbarSecondaryPageSchemaRegistryItemComponent from './NavbarSecondaryPageSchemaRegistryItemComponent';

interface NavbarSecondaryPageSchemaRegistryItemProps {
    code: string;
    name: string;
    color: string;
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
}

const NavbarSecondaryPageSchemaRegistryItem = ({
    activeLink,
    code,
    name,
    color,
    openedLink,
    setOpenedLink,
}: NavbarSecondaryPageSchemaRegistryItemProps) => {
    // Map State To Props

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedSchemaRegistryDashboardFeature } =
        useAuthorization({
            customCode: code,
            requiredPermissions: [
                {
                    authorizationType: 'SCHEMA_REGISTRY',
                    permission:
                        SchemaRegistryDashboardPermissions
                            .SCHEMA_REGISTRY_DASHBOARD_PERMISSIONS
                            .SCHEMA_REGISTRY_DASHBOARD_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedSubjectFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'SCHEMA_REGISTRY',
                permission:
                    SubjectPermissions.SUBJECT_PERMISSIONS
                        .SUBJECT_FEATURE_ENABLED,
            },
        ],
    });

    if (
        isAuthorizedSchemaRegistryDashboardFeature ||
        isAuthorizedSubjectFeature
    ) {
        return (
            <NavbarSecondaryPageSchemaRegistryItemComponent
                activeLink={activeLink}
                openedLink={openedLink}
                setOpenedLink={setOpenedLink}
                code={code}
                name={name}
                color={color}
                isAuthorizedSchemaRegistryDashboardFeature={
                    isAuthorizedSchemaRegistryDashboardFeature
                }
                isAuthorizedSubjectFeature={isAuthorizedSubjectFeature}
            />
        );
    }
    return <></>;
};

export default NavbarSecondaryPageSchemaRegistryItem;
