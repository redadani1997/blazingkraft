import { ContentDiffPermissions } from 'common/permissions/playground/ContentDiffPermissions';
import { ContentValidationPermissions } from 'common/permissions/playground/ContentValidationPermissions';
import { ConversionsPermissions } from 'common/permissions/playground/ConversionsPermissions';
import { OpenAPIContentPermissions } from 'common/permissions/playground/OpenAPIContentPermissions';
import { OpenAPIDefinitionPermissions } from 'common/permissions/playground/OpenAPIDefinitionPermissions';
import { SchemasContentPermissions } from 'common/permissions/playground/SchemasContentPermissions';
import { SchemasDefinitionPermissions } from 'common/permissions/playground/SchemasDefinitionPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { ActivePage } from '../..';
import NavbarSecondaryPagePlaygroundItemsComponent from './NavbarSecondaryPagePlaygroundItemsComponent';

interface NavbarSecondaryPagePlaygroundItemsProps {
    setActivePage: (activePage: ActivePage) => void;
}

const NavbarSecondaryPagePlaygroundItems = ({
    setActivePage,
}: NavbarSecondaryPagePlaygroundItemsProps) => {
    // Map State To Props
    const { activeLink } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedContentDiffFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'PLAYGROUND',
                permission:
                    ContentDiffPermissions.CONTENT_DIFF_PERMISSIONS
                        .CONTENT_DIFF_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedContentValidationFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        ContentValidationPermissions
                            .CONTENT_VALIDATION_PERMISSIONS
                            .CONTENT_VALIDATION_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedConversionsFeature } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'PLAYGROUND',
                permission:
                    ConversionsPermissions.CONVERSIONS_PERMISSIONS
                        .CONVERSIONS_FEATURE_ENABLED,
            },
        ],
    });
    const { isAuthorized: isAuthorizedOpenAPIContentFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        OpenAPIContentPermissions.OPENAPI_CONTENT_PERMISSIONS
                            .OPENAPI_CONTENT_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedOpenAPIDefinitionFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        OpenAPIDefinitionPermissions
                            .OPENAPI_DEFINITION_PERMISSIONS
                            .OPENAPI_DEFINITION_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedSchemasContentFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        SchemasContentPermissions.SCHEMAS_CONTENT_PERMISSIONS
                            .SCHEMAS_CONTENT_FEATURE_ENABLED,
                },
            ],
        });
    const { isAuthorized: isAuthorizedSchemasDefinitionFeature } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'PLAYGROUND',
                    permission:
                        SchemasDefinitionPermissions
                            .SCHEMAS_DEFINITION_PERMISSIONS
                            .SCHEMAS_DEFINITION_FEATURE_ENABLED,
                },
            ],
        });

    return (
        <NavbarSecondaryPagePlaygroundItemsComponent
            setActivePage={setActivePage}
            activeLink={activeLink}
            isAuthorizedContentDiffFeature={isAuthorizedContentDiffFeature}
            isAuthorizedContentValidationFeature={
                isAuthorizedContentValidationFeature
            }
            isAuthorizedConversionsFeature={isAuthorizedConversionsFeature}
            isAuthorizedOpenAPIContentFeature={
                isAuthorizedOpenAPIContentFeature
            }
            isAuthorizedOpenAPIDefinitionFeature={
                isAuthorizedOpenAPIDefinitionFeature
            }
            isAuthorizedSchemasContentFeature={
                isAuthorizedSchemasContentFeature
            }
            isAuthorizedSchemasDefinitionFeature={
                isAuthorizedSchemasDefinitionFeature
            }
        />
    );
};

export default NavbarSecondaryPagePlaygroundItems;
