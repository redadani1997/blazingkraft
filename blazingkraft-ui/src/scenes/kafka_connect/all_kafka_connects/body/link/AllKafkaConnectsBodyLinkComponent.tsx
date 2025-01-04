import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface AllKafkaConnectsBodyLinkComponentProps {
    name: string;
    goto?: string;
}

const AllKafkaConnectsBodyLinkComponent = ({
    name,
    goto,
}: AllKafkaConnectsBodyLinkComponentProps) => {
    if (goto) {
        return (
            <Anchor component={Link} to={goto}>
                {name}
            </Anchor>
        );
    }
    return <Text>{name}</Text>;
};

export default AllKafkaConnectsBodyLinkComponent;
