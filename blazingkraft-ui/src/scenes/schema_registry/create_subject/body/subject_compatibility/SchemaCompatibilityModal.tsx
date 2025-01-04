import { Anchor, Badge, Button, Card, Text, ThemeIcon } from '@mantine/core';
import { SchemaCompatibility } from 'common/types/schema_registry';
import { useState } from 'react';
import { TbCheck } from 'react-icons/tb';
import CommonModal from 'scenes/common/modal/CommonModal';
import CommonTooltip from 'scenes/common/tooltip/CommonTooltip';

interface SchemaCompatibilityModalProps {
    setSchemaCompatibility: any;
    schemaCompatibility: SchemaCompatibility;
}

function renderCard(title, doc, setSchemaCompatibility, schemaCompatibility) {
    return (
        <Card
            withBorder
            shadow="sm"
            radius="md"
            className="my-1"
            style={{
                cursor: 'pointer',
            }}
            onClick={() => setSchemaCompatibility(title)}
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Badge size="lg">
                    <div className="flex items-center">
                        <Text>{title}</Text>
                        {schemaCompatibility === title && (
                            <ThemeIcon size="1rem" className="ml-2">
                                <TbCheck />
                            </ThemeIcon>
                        )}
                    </div>
                </Badge>
                <Text className="pl-3">{doc}</Text>
            </Card.Section>
        </Card>
    );
}

function renderModalBody(setSchemaCompatibility, schemaCompatibility) {
    return (
        <>
            <div className="flex flex-col">
                {renderCard(
                    'BACKWARD',
                    'A Consumer currently consuming and validating messages using the Schema N will be able to process messages produced by schema N-1. In other words you can delete fields or add new optional fields to the newly-created schema N.',
                    setSchemaCompatibility,
                    schemaCompatibility,
                )}
                {renderCard(
                    'BACKWARD_TRANSITIVE',
                    'A Consumer currently consuming and validating messages using the Schema N will be able to process messages produced by schema N, N-1 or N-2. In other words you can delete fields or add new optional fields to the newly-created schema N.',
                    setSchemaCompatibility,
                    schemaCompatibility,
                )}
                {renderCard(
                    'FORWARD',
                    'A Consumer currently consuming and validating messages using the Schema N or N-1 will be able to process messages produced by schema N. In other words you can delete optional fields or add new fields to the newly-created schema N.',
                    setSchemaCompatibility,
                    schemaCompatibility,
                )}
                {renderCard(
                    'FORWARD_TRANSITIVE',
                    'A Consumer currently consuming and validating messages using the Schema N, N-1 or N-2 will be able to process messages produced by schema N. In other words you can delete optional fields or add new fields to the newly-created schema N.',
                    setSchemaCompatibility,
                    schemaCompatibility,
                )}
                {renderCard(
                    'FULL',
                    'FORWARD + BACKWARD Compatibility.',
                    setSchemaCompatibility,
                    schemaCompatibility,
                )}
                {renderCard(
                    'FULL_TRANSITIVE',
                    'BACKWARD_TRANSITIVE + FORWARD_TRANSITIVE Compatibility.',
                    setSchemaCompatibility,
                    schemaCompatibility,
                )}
                {renderCard(
                    'NONE',
                    "No compatibily checks are done when creating new schema versions. Selecting this basically means that you either know what you're doing, or want to test this out in a test environment, or you simply want to shoot yourself in the foot if you're in production.",
                    setSchemaCompatibility,
                    schemaCompatibility,
                )}
            </div>

            <Text className="pt-2" size="xs" color="dimmed">
                Props to Confluent for this outstanding documentation,
                <Anchor
                    className="pl-1"
                    size="xs"
                    href={`https://docs.confluent.io/platform/current/schema-registry/avro.html#compatibility-types`}
                    target="_blank"
                >
                    learn more here
                </Anchor>
            </Text>
        </>
    );
}

function SchemaCompatibilityModal({
    setSchemaCompatibility,
    schemaCompatibility,
}: SchemaCompatibilityModalProps) {
    const [isOpened, setIsOpened] = useState(false);

    const modalBody = renderModalBody(
        setSchemaCompatibility,
        schemaCompatibility,
    );
    return (
        <>
            <CommonTooltip label={schemaCompatibility}>
                <Button
                    variant="outline"
                    color="cyan"
                    onClick={() => setIsOpened(!isOpened)}
                    className="w-full"
                >
                    Compatibility
                </Button>
            </CommonTooltip>
            <CommonModal
                modalTitle="Schema Compatibility"
                isOpen={isOpened}
                onClose={() => setIsOpened(false)}
                modalBody={modalBody}
            />
        </>
    );
}

export default SchemaCompatibilityModal;
