import { ConsumerDeserializer } from 'common/types/consumer';
import { ConsumerUtils } from 'common/utils/ConsumerUtils';
import CommonTabs, { CommonTabsItemProps } from 'scenes/common/tabs/CommonTabs';
import BlazingConsumerSchemaEditor from './BlazingConsumerSchemaEditor';

interface BlazingConsumerSchemaTabsProps {
    keyDeserializer: ConsumerDeserializer;
    valueDeserializer: ConsumerDeserializer;
    schemaTab: string;
    setSchemaTab: (schemaTab: string) => void;

    keySchema: string;
    valueSchema: string;
    setKeySchema: (keySchema: string) => void;
    setValueSchema: (valueSchema: string) => void;
    setIsKeySchemaSyntaxValid: (isKeySchemaSyntaxValid: boolean) => void;
    setIsKeySchemaDefinitionValid: (
        isKeySchemaDefinitionValid: boolean,
    ) => void;
    setIsValueSchemaSyntaxValid: (isValueSchemaSyntaxValid: boolean) => void;
    setIsValueSchemaDefinitionValid: (
        isValueSchemaDefinitionValid: boolean,
    ) => void;
}

function BlazingConsumerSchemaTabs({
    keyDeserializer,
    valueDeserializer,
    schemaTab,
    setSchemaTab,
    keySchema,
    setIsKeySchemaDefinitionValid,
    setIsKeySchemaSyntaxValid,
    setIsValueSchemaDefinitionValid,
    setIsValueSchemaSyntaxValid,
    setKeySchema,
    setValueSchema,
    valueSchema,
}: BlazingConsumerSchemaTabsProps) {
    const items: CommonTabsItemProps[] = [];
    if (ConsumerUtils.isSchemaEditorDeserializer(keyDeserializer)) {
        items.push({
            label: 'Key Schema',
            value: 'Key Schema',
            children: (
                <BlazingConsumerSchemaEditor
                    deserializer={keyDeserializer}
                    schema={keySchema}
                    setSchema={setKeySchema}
                    setIsSchemaSyntaxValid={setIsKeySchemaSyntaxValid}
                    setIsSchemaDefinitionValid={setIsKeySchemaDefinitionValid}
                />
            ),
        });
    }
    if (ConsumerUtils.isSchemaEditorDeserializer(valueDeserializer)) {
        items.push({
            label: 'Value Schema',
            value: 'Value Schema',
            children: (
                <BlazingConsumerSchemaEditor
                    deserializer={valueDeserializer}
                    schema={valueSchema}
                    setSchema={setValueSchema}
                    setIsSchemaSyntaxValid={setIsValueSchemaSyntaxValid}
                    setIsSchemaDefinitionValid={setIsValueSchemaDefinitionValid}
                />
            ),
        });
    }

    return (
        <CommonTabs
            container={{
                variant: 'outline',
                value: schemaTab,
                defaultValue: schemaTab,
                onTabChange: setSchemaTab,
                className: 'mt-4',
            }}
            items={items}
        />
    );
}

export default BlazingConsumerSchemaTabs;
