import { useDocumentTitle } from '@mantine/hooks';
import { Offset } from 'common/types/offset';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import offsetActions, {
    OffsetSpecsByTopicPartition,
} from 'scenes/offset/redux/actions';
import consumerGroupActions from '../redux/actions';
import ConsumerGroupDetailsComponent from './ConsumerGroupDetailsComponent';

const ConsumerGroupDetails = () => {
    useDocumentTitle('Blazing KRaft - Consumer Group Details');

    // Map State To Props
    const { isDescribeConsumerGroupPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isDescribeConsumerGroupPending:
                    store.consumerGroupReducer.isDescribeConsumerGroupPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, consumerGroup } = useParams();
    const location = useLocation();

    const describeConsumerGroup = () =>
        dispatch(
            consumerGroupActions.describeConsumerGroup(
                consumerGroup,
                clusterCode,
            ),
        );

    const listConsumerGroupOffsets = () =>
        dispatch(
            offsetActions.listConsumerGroupOffsets(consumerGroup, clusterCode),
        );

    const listConsumerGroupEarliestTopicPartitionsOffsets =
        offsetSpecsByTopicPartition =>
            dispatch(
                offsetActions.listConsumerGroupEarliestTopicPartitionsOffsets(
                    'READ_UNCOMMITTED',
                    offsetSpecsByTopicPartition,
                    clusterCode,
                ),
            );

    const listConsumerGroupLatestTopicPartitionsOffsets =
        offsetSpecsByTopicPartition =>
            dispatch(
                offsetActions.listConsumerGroupLatestTopicPartitionsOffsets(
                    'READ_UNCOMMITTED',
                    offsetSpecsByTopicPartition,
                    clusterCode,
                ),
            );

    const refreshPageContent = () => {
        describeConsumerGroup();
        listConsumerGroupOffsets().then(({ value }: { value: Offset[] }) => {
            if (!value || value.length === 0) return;
            const offsetSpecsByTopicPartition: OffsetSpecsByTopicPartition[] =
                value.map(({ topic, partition }) => ({
                    topicPartition: { topic, partition },
                    offsetSpec: 'NONE',
                    timestamp: undefined,
                }));
            if (offsetSpecsByTopicPartition.length > 0) {
                listConsumerGroupEarliestTopicPartitionsOffsets(
                    offsetSpecsByTopicPartition,
                );
                listConsumerGroupLatestTopicPartitionsOffsets(
                    offsetSpecsByTopicPartition,
                );
            }
        });
    };

    useEffect(() => {
        refreshPageContent();
    }, [location]);

    return (
        <>
            <ConsumerGroupDetailsComponent
                refreshPageContent={refreshPageContent}
            />
        </>
    );
};

export default ConsumerGroupDetails;
