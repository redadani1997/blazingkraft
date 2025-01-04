import { Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

export type CommonBreadCrumbItem = {
    to?: string;
    label: string;
    highlighted: boolean;
};

interface CommonBreadCrumbsProps {
    items: CommonBreadCrumbItem[];
}

function renderAnchor(
    item: CommonBreadCrumbItem,
    index: number,
    itemsLength: number,
) {
    return (
        <Text size="md" className="flex items-center" key={item.label}>
            <Anchor to={item.to} component={Link}>
                {item.label}
            </Anchor>
            {index < itemsLength - 1 && (
                <Text className="px-2" color="dimmed">
                    /
                </Text>
            )}
        </Text>
    );
}

function renderHighlightedLink(
    item: CommonBreadCrumbItem,
    index: number,
    itemsLength: number,
) {
    return (
        <Text
            key={item.label}
            size="lg"
            color="dimmed"
            className="flex items-center"
        >
            {item.label}
            {index < itemsLength - 1 && (
                <Text className="px-2" color="dimmed">
                    /
                </Text>
            )}
        </Text>
    );
}

function renderItems(items: CommonBreadCrumbItem[]) {
    return items.map((item, index) => {
        if (item.highlighted) {
            return renderHighlightedLink(item, index, items.length);
        } else {
            return renderAnchor(item, index, items.length);
        }
    });
}

const CommonBreadCrumbs = ({ items }: CommonBreadCrumbsProps) => {
    return (
        <span className="flex items-center break-all">
            {renderItems(items)}
        </span>
    );
};

export default CommonBreadCrumbs;
