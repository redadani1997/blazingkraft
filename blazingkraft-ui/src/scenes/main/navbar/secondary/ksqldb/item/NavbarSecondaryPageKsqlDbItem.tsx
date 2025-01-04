import { KsqlDbConnectorPermissions } from 'common/permissions/ksqldb/KsqlDbConnectorPermissions';
import { KsqlDbDashboardPermissions } from 'common/permissions/ksqldb/KsqlDbDashboardPermissions';
import { KsqlDbEditorPermissions } from 'common/permissions/ksqldb/KsqlDbEditorPermissions';
import { KsqlDbQueryPermissions } from 'common/permissions/ksqldb/KsqlDbQueryPermissions';
import { KsqlDbStreamPermissions } from 'common/permissions/ksqldb/KsqlDbStreamPermissions';
import { KsqlDbTablePermissions } from 'common/permissions/ksqldb/KsqlDbTablePermissions';
import { KsqlDbTopicPermissions } from 'common/permissions/ksqldb/KsqlDbTopicPermissions';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActiveLink, OpenedLink } from 'scenes/main/navbar';
import NavbarSecondaryPageKsqlDbItemComponent from './NavbarSecondaryPageKsqlDbItemComponent';

interface NavbarSecondaryPageKsqlDbItemProps {
    code: string;
    name: string;
    color: string;
    activeLink: ActiveLink;
    openedLink: OpenedLink;
    setOpenedLink: (openedLink: OpenedLink) => void;
}

const NavbarSecondaryPageKsqlDbItem = ({
    activeLink,
    code,
    name,
    color,
    openedLink,
    setOpenedLink,
}: NavbarSecondaryPageKsqlDbItemProps) => {
    // Map State To Props

    // Map Dispatch To Props

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

    if (
        isAuthorizedKsqlDbDashboardFeature ||
        isAuthorizedKsqlDbConnectorFeature ||
        isAuthorizedKsqlDbTableFeature ||
        isAuthorizedKsqlDbTopicFeature ||
        isAuthorizedKsqlDbStreamFeature ||
        isAuthorizedKsqlDbQueryFeature ||
        isAuthorizedKsqlDbEditorFeature
    ) {
        return (
            <NavbarSecondaryPageKsqlDbItemComponent
                activeLink={activeLink}
                openedLink={openedLink}
                setOpenedLink={setOpenedLink}
                code={code}
                name={name}
                color={color}
                isAuthorizedKsqlDbDashboardFeature={
                    isAuthorizedKsqlDbDashboardFeature
                }
                isAuthorizedKsqlDbConnectorFeature={
                    isAuthorizedKsqlDbConnectorFeature
                }
                isAuthorizedKsqlDbTableFeature={isAuthorizedKsqlDbTableFeature}
                isAuthorizedKsqlDbTopicFeature={isAuthorizedKsqlDbTopicFeature}
                isAuthorizedKsqlDbStreamFeature={
                    isAuthorizedKsqlDbStreamFeature
                }
                isAuthorizedKsqlDbQueryFeature={isAuthorizedKsqlDbQueryFeature}
                isAuthorizedKsqlDbEditorFeature={
                    isAuthorizedKsqlDbEditorFeature
                }
            />
        );
    }
    return <></>;
};

export default NavbarSecondaryPageKsqlDbItem;
