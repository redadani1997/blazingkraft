import { ContentDiffPermissions } from './playground/ContentDiffPermissions';
import { ContentValidationPermissions } from './playground/ContentValidationPermissions';
import { ConversionsPermissions } from './playground/ConversionsPermissions';
import { OpenAPIContentPermissions } from './playground/OpenAPIContentPermissions';
import { OpenAPIDefinitionPermissions } from './playground/OpenAPIDefinitionPermissions';
import { SchemasContentPermissions } from './playground/SchemasContentPermissions';
import { SchemasDefinitionPermissions } from './playground/SchemasDefinitionPermissions';

const ALL_PERMISSIONS = [
    ...ContentDiffPermissions.CONTENT_DIFF_PERMISSIONS_LIST,
    ...ContentValidationPermissions.CONTENT_VALIDATION_PERMISSIONS_LIST,
    ...ConversionsPermissions.CONVERSIONS_PERMISSIONS_LIST,
    ...OpenAPIContentPermissions.OPENAPI_CONTENT_PERMISSIONS_LIST,
    ...OpenAPIDefinitionPermissions.OPENAPI_DEFINITION_PERMISSIONS_LIST,
    ...SchemasContentPermissions.SCHEMAS_CONTENT_PERMISSIONS_LIST,
    ...SchemasDefinitionPermissions.SCHEMAS_DEFINITION_PERMISSIONS_LIST,
] as const;

const PlaygroundPermissions = {
    ALL_PERMISSIONS,
};

export default PlaygroundPermissions;
