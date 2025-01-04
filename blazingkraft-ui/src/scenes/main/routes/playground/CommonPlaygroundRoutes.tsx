import { ContentDiffPermissions } from 'common/permissions/playground/ContentDiffPermissions';
import { ContentValidationPermissions } from 'common/permissions/playground/ContentValidationPermissions';
import { ConversionsPermissions } from 'common/permissions/playground/ConversionsPermissions';
import { OpenAPIContentPermissions } from 'common/permissions/playground/OpenAPIContentPermissions';
import { OpenAPIDefinitionPermissions } from 'common/permissions/playground/OpenAPIDefinitionPermissions';
import { SchemasContentPermissions } from 'common/permissions/playground/SchemasContentPermissions';
import { SchemasDefinitionPermissions } from 'common/permissions/playground/SchemasDefinitionPermissions';
import { Route } from 'react-router';
import WithAuthorization from 'scenes/common/authorization/hoc/WithAuthorization';
import ContentDiff from 'scenes/playground/content_diff/ContentDiff';
import ContentValidation from 'scenes/playground/content_validation/ContentValidation';
import Conversions from 'scenes/playground/conversions/Conversions';
import OpenAPIContent from 'scenes/playground/openapi_content/OpenAPIContent';
import OpenAPIDefinition from 'scenes/playground/openapi_definition/OpenAPIDefinition';
import SchemasContent from 'scenes/playground/schemas_content/SchemasContent';
import SchemasDefinition from 'scenes/playground/schemas_definition/SchemasDefinition';
import CommonRoutesHoc from '../CommonRoutesHoc';

// const ContentDiff = lazy(() =>
//     import('scenes/playground/content_diff/ContentDiff').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const ContentValidation = lazy(() =>
//     import('scenes/playground/content_validation/ContentValidation').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const Conversions = lazy(() =>
//     import('scenes/playground/conversions/Conversions').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const OpenAPIContent = lazy(() =>
//     import('scenes/playground/openapi_content/OpenAPIContent').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const OpenAPIDefinition = lazy(() =>
//     import('scenes/playground/openapi_definition/OpenAPIDefinition').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );
// const SchemasContent = lazy(() =>
//     import('scenes/playground/schemas_content/SchemasContent').catch(() => {
//         return { default: ServiceUnavailablePage };
//     }),
// );
// const SchemasDefinition = lazy(() =>
//     import('scenes/playground/schemas_definition/SchemasDefinition').catch(
//         () => {
//             return { default: ServiceUnavailablePage };
//         },
//     ),
// );

const CommonPlaygroundRoutes = [
    <Route
        key="PLAYGROUND"
        path="/playground/openapi/definition"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'PLAYGROUND',
                    type: 'OPENAPI_DEFINITION',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                OpenAPIDefinitionPermissions
                                    .OPENAPI_DEFINITION_PERMISSIONS
                                    .OPENAPI_DEFINITION_FEATURE_ENABLED,
                            authorizationType: 'PLAYGROUND',
                        },
                    ]}
                    renderForbidden
                >
                    <OpenAPIDefinition />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="PLAYGROUND_SCHEMA_DEFINITION"
        path="/playground/schemas/definition"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'PLAYGROUND',
                    type: 'SCHEMAS_DEFINITION',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                SchemasDefinitionPermissions
                                    .SCHEMAS_DEFINITION_PERMISSIONS
                                    .SCHEMAS_DEFINITION_FEATURE_ENABLED,
                            authorizationType: 'PLAYGROUND',
                        },
                    ]}
                    renderForbidden
                >
                    <SchemasDefinition />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="PLAYGROUND_OPENAPI_CONTENT"
        path="/playground/openapi/content"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'PLAYGROUND',
                    type: 'OPENAPI_CONTENT',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                OpenAPIContentPermissions
                                    .OPENAPI_CONTENT_PERMISSIONS
                                    .OPENAPI_CONTENT_FEATURE_ENABLED,
                            authorizationType: 'PLAYGROUND',
                        },
                    ]}
                    renderForbidden
                >
                    <OpenAPIContent />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="PLAYGROUND_SCHEMAS_CONTENT"
        path="/playground/schemas/content"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'PLAYGROUND',
                    type: 'SCHEMAS_CONTENT',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                SchemasContentPermissions
                                    .SCHEMAS_CONTENT_PERMISSIONS
                                    .SCHEMAS_CONTENT_FEATURE_ENABLED,
                            authorizationType: 'PLAYGROUND',
                        },
                    ]}
                    renderForbidden
                >
                    <SchemasContent />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="PLAYGROUND_CONTENT_VALIDATION"
        path="/playground/content/validation"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'PLAYGROUND',
                    type: 'CONTENT_VALIDATION',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ContentValidationPermissions
                                    .CONTENT_VALIDATION_PERMISSIONS
                                    .CONTENT_VALIDATION_FEATURE_ENABLED,
                            authorizationType: 'PLAYGROUND',
                        },
                    ]}
                    renderForbidden
                >
                    <ContentValidation />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="PLAYGROUND_CONTENT_DIFF"
        path="/playground/content/diff"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'PLAYGROUND',
                    type: 'CONTENT_DIFF',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ContentDiffPermissions.CONTENT_DIFF_PERMISSIONS
                                    .CONTENT_DIFF_FEATURE_ENABLED,
                            authorizationType: 'PLAYGROUND',
                        },
                    ]}
                    renderForbidden
                >
                    <ContentDiff />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
    <Route
        key="PLAYGROUND_CONVERSIONS"
        path="/playground/conversions"
        element={
            <CommonRoutesHoc
                activeLink={{
                    id: 'PLAYGROUND',
                    type: 'CONVERSIONS',
                }}
            >
                <WithAuthorization
                    requiredPermissions={[
                        {
                            permission:
                                ConversionsPermissions.CONVERSIONS_PERMISSIONS
                                    .CONVERSIONS_FEATURE_ENABLED,
                            authorizationType: 'PLAYGROUND',
                        },
                    ]}
                    renderForbidden
                >
                    <Conversions />
                </WithAuthorization>
            </CommonRoutesHoc>
        }
    />,
];

export default CommonPlaygroundRoutes;
