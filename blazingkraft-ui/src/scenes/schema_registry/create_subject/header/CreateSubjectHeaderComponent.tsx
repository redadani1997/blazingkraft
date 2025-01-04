import { useParams } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel label="Subject Creation" />
        </div>
    );
}

function CreateSubjectComponent() {
    const { schemaRegistryCode } = useParams();
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
                    highlighted: false,
                    to: `/schema_registries/${schemaRegistryCode}/dashboard`,
                    label: schemaRegistryCode,
                },
                {
                    highlighted: false,
                    to: `/schema_registries/${schemaRegistryCode}/subjects`,
                    label: 'Subjects',
                },
                {
                    highlighted: true,
                    label: 'Create Subject',
                },
            ]}
            title={title}
        />
    );
}

export default CreateSubjectComponent;
