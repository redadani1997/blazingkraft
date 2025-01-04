import {
    ActionIcon,
    Anchor,
    Tooltip,
    useMantineColorScheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { TopicDescription } from 'common/types/topic';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import {
    TbArrowBigDownLines,
    TbArrowBigUpLines,
    TbInfoTriangleFilled,
} from 'react-icons/tb';
import { Link } from 'react-router-dom';

interface AllTopicsBodyLinkComponentProps {
    topicDescription: TopicDescription;
    clusterCode: string;
    isAuthorizedConsume: boolean;
    isAuthorizedProduce: boolean;
    addFavoriteTopic: (topic: string) => void;
    removeFavoriteTopic: (topic: string) => void;
}

const AllTopicsBodyLinkComponent = ({
    clusterCode,
    topicDescription,
    isAuthorizedConsume,
    isAuthorizedProduce,
    addFavoriteTopic,
    removeFavoriteTopic,
}: AllTopicsBodyLinkComponentProps) => {
    const { hovered, ref } = useHover();
    const { colorScheme } = useMantineColorScheme();
    const favoriteColor = colorScheme === 'dark' ? 'yellow' : 'red';

    return (
        <div ref={ref} className="flex justify-between items-center w-full">
            <div className="flex items-center">
                <Anchor
                    className="text-center"
                    component={Link}
                    to={`/clusters/${clusterCode}/topics/${topicDescription.name}`}
                >
                    {topicDescription.name}
                </Anchor>
                {topicDescription.internal && (
                    <>
                        <Tooltip label="Internal Topic">
                            <ActionIcon className="ml-1">
                                <TbInfoTriangleFilled size="1rem" />
                            </ActionIcon>
                        </Tooltip>
                    </>
                )}
                {hovered && !topicDescription.isFavorite && (
                    <Tooltip label="Add to Favorites">
                        <ActionIcon
                            className="ml-1"
                            onClick={() => {
                                addFavoriteTopic(topicDescription.name);
                            }}
                        >
                            <AiOutlineStar size="1.1rem" />
                        </ActionIcon>
                    </Tooltip>
                )}
                {topicDescription.isFavorite && (
                    <Tooltip label="Remove from Favorites">
                        <ActionIcon
                            className="ml-1"
                            onClick={() => {
                                removeFavoriteTopic(topicDescription.name);
                            }}
                        >
                            <AiFillStar color={favoriteColor} size="1.1rem" />
                        </ActionIcon>
                    </Tooltip>
                )}
            </div>

            {(isAuthorizedProduce || isAuthorizedConsume) && (
                <div className="pl-2 flex">
                    {isAuthorizedProduce && (
                        <Tooltip label="Produce">
                            <ActionIcon
                                color="blue"
                                component={Link}
                                to={`/clusters/${clusterCode}/producer/blazing_producer?topic=${topicDescription.name}`}
                            >
                                <TbArrowBigUpLines size={22} />
                            </ActionIcon>
                        </Tooltip>
                    )}
                    {isAuthorizedConsume && (
                        <Tooltip label="Consume">
                            <ActionIcon
                                className="ml-1"
                                color="blue"
                                component={Link}
                                to={`/clusters/${clusterCode}/consumer/blazing_consumer?topics=${topicDescription.name}`}
                            >
                                <TbArrowBigDownLines size={22} />
                            </ActionIcon>
                        </Tooltip>
                    )}
                </div>
            )}
        </div>
    );
};

export default AllTopicsBodyLinkComponent;
