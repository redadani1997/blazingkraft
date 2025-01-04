import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import connectorActions from '../redux/actions';
import RestartConnectorComponent from './RestartConnectorComponent';

interface RestartConnectorProps {
    refreshPageContent: () => void;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const RestartConnector = ({
    refreshPageContent,
    isModalOpen,
    setIsModalOpen,
}: RestartConnectorProps) => {
    // Map State To Props
    const { isRestartConnectorPending } = useSelector((store: ReduxStore) => {
        return {
            isRestartConnectorPending:
                store.connectorReducer.isRestartConnectorPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();

    const restartConnector = (includeTasks, onlyFailed) =>
        dispatch(
            connectorActions.restartConnector(
                connector,
                includeTasks,
                onlyFailed,
                kafkaConnectCode,
            ),
        ).then(() => {
            setIsModalOpen(false);
            refreshPageContent();
        });

    return (
        <>
            <RestartConnectorComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                restartConnector={restartConnector}
                isRestartConnectorPending={isRestartConnectorPending}
                connector={connector}
            />
        </>
    );
};

export default RestartConnector;
