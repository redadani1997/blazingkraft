import { SchemaRegistryServerPermissions } from 'common/permissions/schema_registry/SchemaRegistryServerPermissions';
import { SubjectPermissions } from 'common/permissions/schema_registry/SubjectPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import SubjectsHeaderComponent from './SubjectsHeaderComponent';

interface SubjectsHeaderProps {
    refreshPageContent: () => void;
}

const SubjectsHeader = ({ refreshPageContent }: SubjectsHeaderProps) => {
    // Map State To Props
    const { isGetSubjectsMetaPending, schemaRegistryConfig, subjectsMeta } =
        useSelector((store: ReduxStore) => {
            return {
                isGetSubjectsMetaPending:
                    store.schemaRegistryReducer.isGetSubjectsMetaPending,
                schemaRegistryConfig:
                    store.schemaRegistryReducer.schemaRegistryConfig,
                subjectsMeta: store.schemaRegistryReducer.subjectsMeta,
            };
        }, shallowEqual);

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedUpdateSchemaRegistryCompatibility } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'SCHEMA_REGISTRY',
                    permission:
                        SchemaRegistryServerPermissions
                            .SCHEMA_REGISTRY_SERVER_PERMISSIONS
                            .UPDATE_SCHEMA_REGISTRY_COMPATIBILITY,
                },
            ],
        });
    const { isAuthorized: isAuthorizedUpdateSchemaRegistryMode } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'SCHEMA_REGISTRY',
                    permission:
                        SchemaRegistryServerPermissions
                            .SCHEMA_REGISTRY_SERVER_PERMISSIONS
                            .UPDATE_SCHEMA_REGISTRY_MODE,
                },
            ],
        });
    const { isAuthorized: isAuthorizedCreateSubject } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'SCHEMA_REGISTRY',
                permission:
                    SubjectPermissions.SUBJECT_PERMISSIONS.CREATE_SUBJECT,
            },
        ],
    });

    return (
        <SubjectsHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetSubjectsMetaPending}
            schemaRegistryConfig={schemaRegistryConfig}
            numberOfSubjects={subjectsMeta.length}
            isAuthorizedUpdateSchemaRegistryCompatibility={
                isAuthorizedUpdateSchemaRegistryCompatibility
            }
            isAuthorizedUpdateSchemaRegistryMode={
                isAuthorizedUpdateSchemaRegistryMode
            }
            isAuthorizedCreateSubject={isAuthorizedCreateSubject}
        />
    );
};

export default SubjectsHeader;
