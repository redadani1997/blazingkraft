import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditConnectorHeaderComponent from './EditConnectorHeaderComponent';

interface EditConnectorHeaderProps {
    refreshPageContent: () => void;
}

const EditConnectorHeader = ({
    refreshPageContent,
}: EditConnectorHeaderProps) => {
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
        <EditConnectorHeaderComponent
            isRefreshPageContentPending={isListConnectorConnectPluginsPending}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditConnectorHeader;
