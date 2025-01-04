import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

interface AllClustersBodyLinkComponentProps {
    name: string;
    goto?: string;
}

const AllClustersBodyLinkComponent = ({
    name,
    goto,
}: AllClustersBodyLinkComponentProps) => {
    if (goto) {
        return (
            <Anchor component={Link} to={goto}>
                {name}
            </Anchor>
        );
    }
    return <Text>{name}</Text>;
};

export default AllClustersBodyLinkComponent;
