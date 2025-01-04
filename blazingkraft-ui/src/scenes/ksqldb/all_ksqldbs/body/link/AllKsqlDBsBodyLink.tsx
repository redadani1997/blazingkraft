import { KsqlDbConnectorPermissions } from 'common/permissions/ksqldb/KsqlDbConnectorPermissions';
import { KsqlDbDashboardPermissions } from 'common/permissions/ksqldb/KsqlDbDashboardPermissions';
import { KsqlDbEditorPermissions } from 'common/permissions/ksqldb/KsqlDbEditorPermissions';
import { KsqlDbQueryPermissions } from 'common/permissions/ksqldb/KsqlDbQueryPermissions';
import { KsqlDbStreamPermissions } from 'common/permissions/ksqldb/KsqlDbStreamPermissions';
import { KsqlDbTablePermissions } from 'common/permissions/ksqldb/KsqlDbTablePermissions';
import { KsqlDbTopicPermissions } from 'common/permissions/ksqldb/KsqlDbTopicPermissions';
import { useMemo } from 'react';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllKsqlDBsBodyLinkComponent from './AllKsqlDBsBodyLinkComponent';

interface AllKsqlDBsBodyLinkProps {
    code: string;
    name: string;
}

const AllKsqlDBsBodyLink = ({ code, name }: AllKsqlDBsBodyLinkProps) => {
    // Authorization
    const { isAuthorized: isAuthorizedKsqlDbDashboardFeature } =
        useAuthorization({
            customCode: code,
            requiredPermissions: [
                {
                    authorizationType: 'KSQLDB',
                    permission:
                        KsqlDbDashboardPermissions.KSQLDB_DASHBOARD_PERMISSIONS
                            .KSQLDB_DASHBOARD_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedKsqlDbConnectorFeature } =
        useAuthorization({
            customCode: code,
            requiredPermissions: [
                {
                    authorizationType: 'KSQLDB',
                    permission:
                        KsqlDbConnectorPermissions.KSQLDB_CONNECTOR_PERMISSIONS
                            .KSQLDB_CONNECTOR_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedKsqlDbTableFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbTablePermissions.KSQLDB_TABLE_PERMISSIONS
                        .KSQLDB_TABLE_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedKsqlDbTopicFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbTopicPermissions.KSQLDB_TOPIC_PERMISSIONS
                        .KSQLDB_TOPIC_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedKsqlDbEditorFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbEditorPermissions.KSQLDB_EDITOR_PERMISSIONS
                        .KSQLDB_EDITOR_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedKsqlDbStreamFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbStreamPermissions.KSQLDB_STREAM_PERMISSIONS
                        .KSQLDB_STREAM_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedKsqlDbQueryFeature } = useAuthorization({
        customCode: code,
        requiredPermissions: [
            {
                authorizationType: 'KSQLDB',
                permission:
                    KsqlDbQueryPermissions.KSQLDB_QUERY_PERMISSIONS
                        .KSQLDB_QUERY_FEATURE_ENABLED,
            },
        ],
    });

    const goto = useMemo(() => {
        if (isAuthorizedKsqlDbEditorFeature) {
            return `/ksqldbs/${code}/editor`;
        }
        if (isAuthorizedKsqlDbQueryFeature) {
            return `/ksqldbs/${code}/queries`;
        }
        if (isAuthorizedKsqlDbTableFeature) {
            return `/ksqldbs/${code}/tables`;
        }
        if (isAuthorizedKsqlDbStreamFeature) {
            return `/ksqldbs/${code}/streams`;
        }
        if (isAuthorizedKsqlDbConnectorFeature) {
            return `/ksqldbs/${code}/connectors`;
        }
        if (isAuthorizedKsqlDbTopicFeature) {
            return `/ksqldbs/${code}/topics`;
        }
        if (isAuthorizedKsqlDbDashboardFeature) {
            return `/ksqldbs/${code}/dashboard`;
        }

        return null;
    }, [
        code,
        isAuthorizedKsqlDbEditorFeature,
        isAuthorizedKsqlDbQueryFeature,
        isAuthorizedKsqlDbTableFeature,
        isAuthorizedKsqlDbStreamFeature,
        isAuthorizedKsqlDbConnectorFeature,
        isAuthorizedKsqlDbTopicFeature,
        isAuthorizedKsqlDbDashboardFeature,
    ]);

    return <AllKsqlDBsBodyLinkComponent goto={goto} name={name} />;
};

export default AllKsqlDBsBodyLink;
