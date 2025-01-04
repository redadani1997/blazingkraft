import { TopicDescription } from 'common/types/topic';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import topicActions from 'scenes/topic/redux/actions';
import AllTopicsBodyLinkComponent from './AllTopicsBodyLinkComponent';

interface AllTopicsBodyLinkProps {
    topicDescription: TopicDescription;
    isAuthorizedConsume: boolean;
    isAuthorizedProduce: boolean;
}

const AllTopicsBodyLink = ({
    topicDescription,
    isAuthorizedConsume,
    isAuthorizedProduce,
}: AllTopicsBodyLinkProps) => {
    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const addFavoriteTopic = topic =>
        dispatch(topicActions.addFavoriteTopic(topic, clusterCode));
    const removeFavoriteTopic = topic =>
        dispatch(topicActions.removeFavoriteTopic(topic, clusterCode));

    // Authorization

    return (
        <AllTopicsBodyLinkComponent
            clusterCode={clusterCode}
            topicDescription={topicDescription}
            isAuthorizedProduce={isAuthorizedProduce}
            isAuthorizedConsume={isAuthorizedConsume}
            addFavoriteTopic={addFavoriteTopic}
            removeFavoriteTopic={removeFavoriteTopic}
        />
    );
};

export default AllTopicsBodyLink;
