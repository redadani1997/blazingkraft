import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditKafkaConnectHeaderComponent from './EditKafkaConnectHeaderComponent';

interface EditKafkaConnectHeaderProps {
    refreshPageContent: () => void;
}

const EditKafkaConnectHeader = ({
    refreshPageContent,
}: EditKafkaConnectHeaderProps) => {
    // Map State To Props
    const { isGetKafkaConnectDetailsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetKafkaConnectDetailsPending:
                    store.kafkaConnectReducer.isGetKafkaConnectDetailsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    return (
        <EditKafkaConnectHeaderComponent
            isRefreshPageContentPending={isGetKafkaConnectDetailsPending}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditKafkaConnectHeader;
