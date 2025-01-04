import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import connectorActions from '../redux/actions';
import DestroyConnectorComponent from './DestroyConnectorComponent';

interface DestroyConnectorProps {
    refreshPageContent: () => void;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const DestroyConnector = ({
    isModalOpen,
    setIsModalOpen,
}: DestroyConnectorProps) => {
    // Map State To Props
    const { isDestroyConnectorPending } = useSelector((store: ReduxStore) => {
        return {
            isDestroyConnectorPending:
                store.connectorReducer.isDestroyConnectorPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();
    const navigate = useNavigate();

    const destroyConnector = () =>
        dispatch(
            connectorActions.destroyConnector(connector, kafkaConnectCode),
        ).then(() => {
            setIsModalOpen(false);
            navigate(`/kafka_connects/${kafkaConnectCode}/connectors`);
        });

    return (
        <>
            <DestroyConnectorComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                destroyConnector={destroyConnector}
                isDestroyConnectorPending={isDestroyConnectorPending}
                connector={connector}
            />
        </>
    );
};

export default DestroyConnector;
