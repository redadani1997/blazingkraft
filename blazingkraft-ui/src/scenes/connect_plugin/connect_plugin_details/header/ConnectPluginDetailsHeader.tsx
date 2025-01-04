import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import ConnectPluginDetailsHeaderComponent from './ConnectPluginDetailsHeaderComponent';

interface ConnectPluginDetailsHeaderProps {
    refreshPageContent: () => void;
}

const ConnectPluginDetailsHeader = ({
    refreshPageContent,
}: ConnectPluginDetailsHeaderProps) => {
    // Map State To Props
    const { isGetConnectPluginConfigKeysPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetConnectPluginConfigKeysPending:
                    store.connectPluginReducer
                        .isGetConnectPluginConfigKeysPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();
    // const { kafkaConnectCode } = useParams();

    return (
        <ConnectPluginDetailsHeaderComponent
            isGetConnectPluginConfigKeysPending={
                isGetConnectPluginConfigKeysPending
            }
            refreshPageContent={refreshPageContent}
        />
    );
};

export default ConnectPluginDetailsHeader;
