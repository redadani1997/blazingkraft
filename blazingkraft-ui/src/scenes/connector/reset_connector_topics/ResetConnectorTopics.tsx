import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import connectorActions from '../redux/actions';
import ResetConnectorTopicsComponent from './ResetConnectorTopicsComponent';

interface ResetConnectorTopicsProps {
    refreshPageContent: () => void;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const ResetConnectorTopics = ({
    refreshPageContent,
    isModalOpen,
    setIsModalOpen,
}: ResetConnectorTopicsProps) => {
    // Map State To Props
    const { isResetConnectorActiveTopicsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isResetConnectorActiveTopicsPending:
                    store.connectorReducer.isResetConnectorActiveTopicsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();

    const resetConnectorActiveTopics = () =>
        dispatch(
            connectorActions.resetConnectorActiveTopics(
                connector,
                kafkaConnectCode,
            ),
        ).then(() => {
            setIsModalOpen(false);
            refreshPageContent();
        });

    return (
        <>
            <ResetConnectorTopicsComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                resetConnectorActiveTopics={resetConnectorActiveTopics}
                isResetConnectorActiveTopicsPending={
                    isResetConnectorActiveTopicsPending
                }
                connector={connector}
            />
        </>
    );
};

export default ResetConnectorTopics;
