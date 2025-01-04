import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllConnectPluginsHeaderComponent from './AllConnectPluginsHeaderComponent';

interface AllConnectPluginsHeaderProps {
    refreshPageContent: () => void;
}

const AllConnectPluginsHeader = ({
    refreshPageContent,
}: AllConnectPluginsHeaderProps) => {
    // Map State To Props
    const { allConnectPlugins, isListAllConnectPluginsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isListAllConnectPluginsPending:
                    store.connectPluginReducer.isListAllConnectPluginsPending,
                allConnectPlugins: store.connectPluginReducer.allConnectPlugins,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    return (
        <AllConnectPluginsHeaderComponent
            isRefreshPageContentPending={isListAllConnectPluginsPending}
            refreshPageContent={refreshPageContent}
            allConnectPluginsLength={allConnectPlugins.length}
        />
    );
};

export default AllConnectPluginsHeader;
