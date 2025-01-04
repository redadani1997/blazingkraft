import { SpotlightAction } from '@mantine/spotlight';
import { useMemo } from 'react';
import { BsCodeSlash } from 'react-icons/bs';
import { MdOutlineDifference } from 'react-icons/md';
import { SiOpenapiinitiative } from 'react-icons/si';
import { TbArrowsExchange2, TbSchema } from 'react-icons/tb';
import { useNavigate } from 'react-router';

interface UseSpotlightPlaygroundActionsComponentProps {
    isAuthorizedContentDiffFeature: boolean;
    isAuthorizedContentValidationFeature: boolean;
    isAuthorizedConversionsFeature: boolean;
    isAuthorizedOpenAPIContentFeature: boolean;
    isAuthorizedOpenAPIDefinitionFeature: boolean;
    isAuthorizedSchemasContentFeature: boolean;
    isAuthorizedSchemasDefinitionFeature: boolean;
}

function UseSpotlightPlaygroundActionsComponent({
    isAuthorizedContentDiffFeature,
    isAuthorizedContentValidationFeature,
    isAuthorizedConversionsFeature,
    isAuthorizedOpenAPIContentFeature,
    isAuthorizedOpenAPIDefinitionFeature,
    isAuthorizedSchemasContentFeature,
    isAuthorizedSchemasDefinitionFeature,
}: UseSpotlightPlaygroundActionsComponentProps): SpotlightAction[] {
    const navigate = useNavigate();
    const actions: SpotlightAction[] = useMemo(() => {
        const computedActions: SpotlightAction[] = [];
        if (isAuthorizedSchemasContentFeature) {
            computedActions.push({
                group: 'Playground',
                title: 'Schemas Content',
                description: 'Validate Schemas Content',
                icon: <TbSchema size="2rem" />,
                onTrigger: () => {
                    navigate('/playground/schemas/content');
                },
            });
        }
        if (isAuthorizedSchemasDefinitionFeature) {
            computedActions.push({
                group: 'Playground',
                title: 'Schemas Definition',
                description: 'Validate Schemas Definition',
                icon: <TbSchema size="2rem" />,
                onTrigger: () => {
                    navigate('/playground/schemas/definition');
                },
            });
        }
        if (isAuthorizedOpenAPIContentFeature) {
            computedActions.push({
                group: 'Playground',
                title: 'OpenAPI Content',
                description: 'Validate OpenAPI Content',
                icon: <SiOpenapiinitiative size="2rem" />,
                onTrigger: () => {
                    navigate('/playground/openapi/content');
                },
            });
        }
        if (isAuthorizedOpenAPIDefinitionFeature) {
            computedActions.push({
                group: 'Playground',
                title: 'OpenAPI Definition',
                description: 'Validate OpenAPI Definition',
                icon: <SiOpenapiinitiative size="2rem" />,
                onTrigger: () => {
                    navigate('/playground/openapi/definition');
                },
            });
        }
        if (isAuthorizedContentValidationFeature) {
            computedActions.push({
                group: 'Playground',
                title: 'Content Validation',
                description: 'Run Content Validation',
                icon: <BsCodeSlash size="2rem" />,
                onTrigger: () => {
                    navigate('/playground/content/validation');
                },
            });
        }
        if (isAuthorizedContentDiffFeature) {
            computedActions.push({
                group: 'Playground',
                title: 'Content Diff',
                description: 'Run Content Diff',
                icon: <MdOutlineDifference size="2rem" />,
                onTrigger: () => {
                    navigate('/playground/content/diff');
                },
            });
        }
        if (isAuthorizedConversionsFeature) {
            computedActions.push({
                group: 'Playground',
                title: 'Conversions',
                description: 'Run Conversions',
                icon: <TbArrowsExchange2 size="2rem" />,
                onTrigger: () => {
                    navigate('/playground/conversions');
                },
            });
        }
        return computedActions;
    }, [
        isAuthorizedContentDiffFeature,
        isAuthorizedContentValidationFeature,
        isAuthorizedConversionsFeature,
        isAuthorizedOpenAPIContentFeature,
        isAuthorizedOpenAPIDefinitionFeature,
        isAuthorizedSchemasContentFeature,
        isAuthorizedSchemasDefinitionFeature,
    ]);

    return actions;
}

export default UseSpotlightPlaygroundActionsComponent;
