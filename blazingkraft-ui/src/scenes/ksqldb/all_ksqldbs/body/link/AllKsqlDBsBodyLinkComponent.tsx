import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface AllKsqlDBsBodyLinkComponentProps {
    name: string;
    goto?: string;
}

const AllKsqlDBsBodyLinkComponent = ({
    name,
    goto,
}: AllKsqlDBsBodyLinkComponentProps) => {
    if (goto) {
        return (
            <Anchor component={Link} to={goto}>
                {name}
            </Anchor>
        );
    }
    return <Text>{name}</Text>;
};

export default AllKsqlDBsBodyLinkComponent;
