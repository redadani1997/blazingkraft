import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface SchemaRegistriesBodyLinkComponentProps {
    name: string;
    goto?: string;
}

const SchemaRegistriesBodyLinkComponent = ({
    name,
    goto,
}: SchemaRegistriesBodyLinkComponentProps) => {
    if (goto) {
        return (
            <Anchor component={Link} to={goto}>
                {name}
            </Anchor>
        );
    }
    return <Text>{name}</Text>;
};

export default SchemaRegistriesBodyLinkComponent;
