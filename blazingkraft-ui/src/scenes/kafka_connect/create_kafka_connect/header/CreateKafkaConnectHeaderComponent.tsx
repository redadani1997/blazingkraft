import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return <CommonTitleLabel label="Kafka Connect Creation" />;
}

function CreateKafkaConnectHeaderComponent() {
    const title = renderTitle();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: false,
                    to: '/kafka_connects',
                    label: 'Kafka Connects',
                },
                {
                    highlighted: true,
                    label: 'Create Kafka Connect',
                },
            ]}
            title={title}
        />
    );
}

export default CreateKafkaConnectHeaderComponent;
