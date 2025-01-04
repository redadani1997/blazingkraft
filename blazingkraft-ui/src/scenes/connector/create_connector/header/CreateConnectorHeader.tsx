import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import CreateConnectorHeaderComponent from './CreateConnectorHeaderComponent';

interface CreateConnectorHeaderProps {
    refreshPageContent: () => void;
}

const CreateConnectorHeader = ({
    refreshPageContent,
}: CreateConnectorHeaderProps) => {
    // Map State To Props
    const { isListConnectorConnectPluginsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isListConnectorConnectPluginsPending:
                    store.connectPluginReducer
                        .isListConnectorConnectPluginsPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();
    // const { kafkaConnectCode } = useParams();

    return (
        <CreateConnectorHeaderComponent
            isRefreshPageContentPending={isListConnectorConnectPluginsPending}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default CreateConnectorHeader;
