import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import connectorActions from '../redux/actions';
import RestartConnectorTaskComponent from './RestartConnectorTaskComponent';

interface RestartConnectorTaskProps {
    refreshPageContent: () => void;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    taskToRestart: number | null;
}

const RestartConnectorTask = ({
    refreshPageContent,
    isModalOpen,
    setIsModalOpen,
    taskToRestart,
}: RestartConnectorTaskProps) => {
    // Map State To Props
    const { isRestartConnectorTaskPending, connectorStateInfo } = useSelector(
        (store: ReduxStore) => {
            return {
                isRestartConnectorTaskPending:
                    store.connectorReducer.isRestartConnectorTaskPending,
                connectorStateInfo: store.connectorReducer.connectorStateInfo,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();

    const restartConnectorTask = task =>
        dispatch(
            connectorActions.restartConnectorTask(
                connector,
                task,
                kafkaConnectCode,
            ),
        ).then(() => {
            setIsModalOpen(false);
            refreshPageContent();
        });

    return (
        <>
            <RestartConnectorTaskComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                restartConnectorTask={restartConnectorTask}
                isRestartConnectorTaskPending={isRestartConnectorTaskPending}
                connector={connector}
                taskToRestart={taskToRestart}
                connectorStateInfo={connectorStateInfo}
            />
        </>
    );
};

export default RestartConnectorTask;
