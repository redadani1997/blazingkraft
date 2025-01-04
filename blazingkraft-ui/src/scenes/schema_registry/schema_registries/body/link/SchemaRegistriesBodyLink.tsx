import { SchemaRegistryDashboardPermissions } from 'common/permissions/schema_registry/SchemaRegistryDashboardPermissions';
import { SubjectPermissions } from 'common/permissions/schema_registry/SubjectPermissions';
import { useMemo } from 'react';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import SchemaRegistriesBodyLinkComponent from './SchemaRegistriesBodyLinkComponent';

interface SchemaRegistriesBodyLinkProps {
    code: string;
    name: string;
}

const SchemaRegistriesBodyLink = ({
    code,
    name,
}: SchemaRegistriesBodyLinkProps) => {
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

    const goto = useMemo(() => {
        if (isAuthorizedSubjectFeature) {
            return `/schema_registries/${code}/subjects`;
        }
        if (isAuthorizedSchemaRegistryDashboardFeature) {
            return `/schema_registries/${code}/dashboard`;
        }

        return null;
    }, [
        code,
        isAuthorizedSchemaRegistryDashboardFeature,
        isAuthorizedSubjectFeature,
    ]);

    return <SchemaRegistriesBodyLinkComponent goto={goto} name={name} />;
};

export default SchemaRegistriesBodyLink;
