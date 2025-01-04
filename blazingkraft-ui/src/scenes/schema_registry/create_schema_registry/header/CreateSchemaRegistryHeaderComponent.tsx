import { Title } from '@mantine/core';
import CommonTitle from 'scenes/common/title/CommonTitle';

function renderTitle() {
    return <Title order={1}>Schema Registry</Title>;
}

function CreateSchemaRegistryHeaderComponent() {
    const title = renderTitle();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: false,
                    to: '/schema_registries',
                    label: 'Schema Registries',
                },
                {
                    highlighted: true,
                    label: 'Create',
                },
            ]}
            title={title}
        />
    );
}

export default CreateSchemaRegistryHeaderComponent;
