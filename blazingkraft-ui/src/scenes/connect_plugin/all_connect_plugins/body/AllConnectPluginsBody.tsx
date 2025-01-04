import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import AllConnectPluginsBodyComponent from './AllConnectPluginsBodyComponent';

const AllConnectPluginsBody = () => {
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
    // const dispatch = useDispatch<any>();

    return (
        <AllConnectPluginsBodyComponent
            isListAllConnectPluginsPending={isListAllConnectPluginsPending}
            allConnectPlugins={allConnectPlugins}
        />
    );
};

export default AllConnectPluginsBody;
