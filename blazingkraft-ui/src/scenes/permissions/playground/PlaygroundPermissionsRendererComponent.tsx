import { Grid } from '@mantine/core';
import PlaygroundPermissions from 'common/permissions/PlaygroundPermissions';
import { ContentDiffPermissions } from 'common/permissions/playground/ContentDiffPermissions';
import { ContentValidationPermissions } from 'common/permissions/playground/ContentValidationPermissions';
import { ConversionsPermissions } from 'common/permissions/playground/ConversionsPermissions';
import { OpenAPIContentPermissions } from 'common/permissions/playground/OpenAPIContentPermissions';
import { OpenAPIDefinitionPermissions } from 'common/permissions/playground/OpenAPIDefinitionPermissions';
import { SchemasContentPermissions } from 'common/permissions/playground/SchemasContentPermissions';
import { SchemasDefinitionPermissions } from 'common/permissions/playground/SchemasDefinitionPermissions';
import { useEffect } from 'react';
import PermissionsWrapper from '../wrapper/PermissionsWrapper';

interface PlaygroundPermissionsRendererComponentProps {
    playgroundPermissions: string[];
    setPlaygroundPermissions: (playgroundPermissions: string[]) => void;
    disabled?: boolean;
    basePermissions?: string[];
}

function initPermissions(
    setPlaygroundPermissions: (
        playgroundPermissions: readonly string[],
    ) => void,
) {
    setPlaygroundPermissions(PlaygroundPermissions.ALL_PERMISSIONS);
}

function constructPermissions(
    setPlaygroundPermissions: (playgroundPermissions: string[]) => void,
    basePermissions: string[],
) {
    setPlaygroundPermissions(basePermissions);
}

function PlaygroundPermissionsRendererComponent({
    playgroundPermissions,
    setPlaygroundPermissions,
    disabled,
    basePermissions,
}: PlaygroundPermissionsRendererComponentProps) {
    useEffect(() => {
        if (basePermissions) {
            constructPermissions(setPlaygroundPermissions, basePermissions);
        } else {
            initPermissions(setPlaygroundPermissions);
        }
    }, [basePermissions]);

    return (
        <Grid>
            <PermissionsWrapper
                header="Schemas Content Validation"
                permissions={playgroundPermissions}
                setPermissions={setPlaygroundPermissions}
                permissionLabels={
                    SchemasContentPermissions.SCHEMAS_CONTENT_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Schemas Definition Validation"
                permissions={playgroundPermissions}
                setPermissions={setPlaygroundPermissions}
                permissionLabels={
                    SchemasDefinitionPermissions.SCHEMAS_DEFINITION_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="OpenAPI Content Validation"
                permissions={playgroundPermissions}
                setPermissions={setPlaygroundPermissions}
                permissionLabels={
                    OpenAPIContentPermissions.OPENAPI_CONTENT_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="OpenAPI Definition Validation"
                permissions={playgroundPermissions}
                setPermissions={setPlaygroundPermissions}
                permissionLabels={
                    OpenAPIDefinitionPermissions.OPENAPI_DEFINITION_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Content Validation"
                permissions={playgroundPermissions}
                setPermissions={setPlaygroundPermissions}
                permissionLabels={
                    ContentValidationPermissions.CONTENT_VALIDATION_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Content Diff"
                permissions={playgroundPermissions}
                setPermissions={setPlaygroundPermissions}
                permissionLabels={
                    ContentDiffPermissions.CONTENT_DIFF_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
            <PermissionsWrapper
                header="Conversions"
                permissions={playgroundPermissions}
                setPermissions={setPlaygroundPermissions}
                permissionLabels={
                    ConversionsPermissions.CONVERSIONS_PERMISSIONS_LABELS_BY_PERMISSION
                }
                disabled={disabled}
            />
        </Grid>
    );
}

export default PlaygroundPermissionsRendererComponent;
