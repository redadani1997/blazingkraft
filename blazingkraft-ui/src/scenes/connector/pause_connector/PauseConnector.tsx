import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import connectorActions from '../redux/actions';
import PauseConnectorComponent from './PauseConnectorComponent';

interface PauseConnectorProps {
    refreshPageContent: () => void;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const PauseConnector = ({
    refreshPageContent,
    isModalOpen,
    setIsModalOpen,
}: PauseConnectorProps) => {
    // Map State To Props
    const { isPauseConnectorPending } = useSelector((store: ReduxStore) => {
        return {
            isPauseConnectorPending:
                store.connectorReducer.isPauseConnectorPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();

    const pauseConnector = () =>
        dispatch(
            connectorActions.pauseConnector(connector, kafkaConnectCode),
        ).then(() => {
            setIsModalOpen(false);
            refreshPageContent();
        });

    return (
        <>
            <PauseConnectorComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                pauseConnector={pauseConnector}
                isPauseConnectorPending={isPauseConnectorPending}
                connector={connector}
            />
        </>
    );
};

export default PauseConnector;
