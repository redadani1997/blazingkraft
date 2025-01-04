import { ActionIcon, Grid, Tooltip } from '@mantine/core';
import React from 'react';
import { BsController } from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface HomePlaygroundLinkComponentProps {
    isAuthorizedContentDiffFeature: boolean;
    isAuthorizedContentValidationFeature: boolean;
    isAuthorizedConversionsFeature: boolean;
    isAuthorizedOpenAPIContentFeature: boolean;
    isAuthorizedOpenAPIDefinitionFeature: boolean;
    isAuthorizedSchemasContentFeature: boolean;
    isAuthorizedSchemasDefinitionFeature: boolean;
}

function determineLink(
    isAuthorizedContentDiffFeature,
    isAuthorizedContentValidationFeature,
    isAuthorizedConversionsFeature,
    isAuthorizedOpenAPIContentFeature,
    isAuthorizedOpenAPIDefinitionFeature,
    isAuthorizedSchemasContentFeature,
    isAuthorizedSchemasDefinitionFeature,
) {
    if (isAuthorizedSchemasContentFeature) {
        return '/playground/schemas/content';
    }
    if (isAuthorizedSchemasDefinitionFeature) {
        return '/playground/schemas/definition';
    }
    if (isAuthorizedOpenAPIContentFeature) {
        return '/playground/openapi/content';
    }
    if (isAuthorizedOpenAPIDefinitionFeature) {
        return '/playground/openapi/definition';
    }
    if (isAuthorizedContentValidationFeature) {
        return '/playground/content/validation';
    }
    if (isAuthorizedContentDiffFeature) {
        return '/playground/content/diff';
    }
    if (isAuthorizedConversionsFeature) {
        return '/playground/conversions';
    }
    return '/home';
}

function HomePlaygroundLinkComponent({
    isAuthorizedContentDiffFeature,
    isAuthorizedContentValidationFeature,
    isAuthorizedConversionsFeature,
    isAuthorizedOpenAPIContentFeature,
    isAuthorizedOpenAPIDefinitionFeature,
    isAuthorizedSchemasContentFeature,
    isAuthorizedSchemasDefinitionFeature,
}: HomePlaygroundLinkComponentProps) {
    const link = determineLink(
        isAuthorizedContentDiffFeature,
        isAuthorizedContentValidationFeature,
        isAuthorizedConversionsFeature,
        isAuthorizedOpenAPIContentFeature,
        isAuthorizedOpenAPIDefinitionFeature,
        isAuthorizedSchemasContentFeature,
        isAuthorizedSchemasDefinitionFeature,
    );
    return (
        <Grid.Col span={12} xs={6} sm={4} md={3} lg={2}>
            <div className="flex items-center justify-center w-full h-full">
                <Tooltip label="Playground">
                    <ActionIcon
                        className="p-4"
                        component={Link}
                        to={link}
                        color="blue"
                        size="10rem"
                    >
                        <BsController size="10rem" />
                    </ActionIcon>
                </Tooltip>
            </div>
        </Grid.Col>
    );
}

export default React.memo(HomePlaygroundLinkComponent);
