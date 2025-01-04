import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import BrokerDetailsHeaderComponent from './BrokerDetailsHeaderComponent';

interface BrokerDetailsHeaderProps {
    refreshPageContent: () => void;
}

const BrokerDetailsHeader = ({
    refreshPageContent,
}: BrokerDetailsHeaderProps) => {
    // Map State To Props
    const { isGetClusterBrokerConfiguration } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetClusterBrokerConfiguration:
                    store.clusterReducer.isGetClusterBrokerConfiguration,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    // Authorization

    return (
        <BrokerDetailsHeaderComponent
            isRefreshPageContentPending={isGetClusterBrokerConfiguration}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default BrokerDetailsHeader;
