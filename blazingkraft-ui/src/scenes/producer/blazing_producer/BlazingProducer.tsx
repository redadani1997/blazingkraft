import { useDocumentTitle } from '@mantine/hooks';
import { ProducerConfiguration } from 'common/types/producer';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import topicActions from 'scenes/topic/redux/actions';
import producerActions from '../redux/actions';
import BlazingProducerComponent from './BlazingProducerComponent';

const BlazingProducer = () => {
    useDocumentTitle('Blazing KRaft - Producer');

    // Map State To Props
    const { isGetProducerConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetProducerConfigurationPending:
                    store.producerReducer.isGetProducerConfigurationPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const getProducerConfiguration = () =>
        dispatch(producerActions.getProducerConfiguration(clusterCode));
    const getAllTopicsDescriptions = reload =>
        dispatch(topicActions.getAllTopicsDescriptions(reload, clusterCode));
    const getSchemaRegistries = () =>
        dispatch(schemaRegistryActions.getSchemaRegistries());

    const refreshPageContent = reload => {
        return getProducerConfiguration().then(
            ({ value }: { value: ProducerConfiguration }) => {
                getAllTopicsDescriptions(reload);
                if (
                    value?.perRequestKeySerializer ||
                    value?.perRequestValueSerializer
                ) {
                    getSchemaRegistries();
                }
            },
        );
    };

    useEffect(() => {
        refreshPageContent(false);
    }, []);

    return (
        <>
            <LoadingSpinner isLoading={isGetProducerConfigurationPending} />
            <BlazingProducerComponent
                refreshPageContent={() => refreshPageContent(true)}
            />
        </>
    );
};

export default BlazingProducer;
