import { useDocumentTitle } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import topicActions from 'scenes/topic/redux/actions';
import consumerActions from '../redux/actions';
import BlazingConsumerComponent from './BlazingConsumerComponent';

const BlazingConsumer = () => {
    useDocumentTitle('Blazing KRaft - Consumer');

    // Map State To Props
    const { isGetConsumerConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetConsumerConfigurationPending:
                    store.consumerReducer.isGetConsumerConfigurationPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const getConsumerConfiguration = () =>
        dispatch(consumerActions.getConsumerConfiguration(clusterCode));
    const getAllTopicsDescriptions = reload =>
        dispatch(topicActions.getAllTopicsDescriptions(reload, clusterCode));

    const refreshPageContent = reload => {
        return getConsumerConfiguration().then(() => {
            return getAllTopicsDescriptions(reload);
        });
    };

    useEffect(() => {
        refreshPageContent(false);
    }, []);

    return (
        <>
            <LoadingSpinner isLoading={isGetConsumerConfigurationPending} />
            <BlazingConsumerComponent
                refreshPageContent={() => refreshPageContent(true)}
            />
        </>
    );
};

export default React.memo(BlazingConsumer);
