import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import ConnectPluginDetailsBodyComponent from './ConnectPluginDetailsBodyComponent';

const ConnectPluginDetailsBody = () => {
    // Map State To Props
    const { connectPluginConfigKeys, isGetConnectPluginConfigKeysPending } =
        useSelector((store: ReduxStore) => {
            return {
                isGetConnectPluginConfigKeysPending:
                    store.connectPluginReducer
                        .isGetConnectPluginConfigKeysPending,
                connectPluginConfigKeys:
                    store.connectPluginReducer.connectPluginConfigKeys,
            };
        }, shallowEqual);
    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();

    return (
        <>
            <LoadingSpinner isLoading={isGetConnectPluginConfigKeysPending} />
            <ConnectPluginDetailsBodyComponent
                connectPluginConfigKeys={connectPluginConfigKeys}
                isGetConnectPluginConfigKeysPending={
                    isGetConnectPluginConfigKeysPending
                }
            />
        </>
    );
};

export default ConnectPluginDetailsBody;
