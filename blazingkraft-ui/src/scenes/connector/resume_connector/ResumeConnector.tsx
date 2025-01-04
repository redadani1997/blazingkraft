import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import connectorActions from '../redux/actions';
import ResumeConnectorComponent from './ResumeConnectorComponent';

interface ResumeConnectorProps {
    refreshPageContent: () => void;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const ResumeConnector = ({
    refreshPageContent,
    isModalOpen,
    setIsModalOpen,
}: ResumeConnectorProps) => {
    // Map State To Props
    const { isResumeConnectorPending } = useSelector((store: ReduxStore) => {
        return {
            isResumeConnectorPending:
                store.connectorReducer.isResumeConnectorPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { kafkaConnectCode, connector } = useParams();

    const resumeConnector = () =>
        dispatch(
            connectorActions.resumeConnector(connector, kafkaConnectCode),
        ).then(() => {
            setIsModalOpen(false);
            refreshPageContent();
        });

    return (
        <>
            <ResumeConnectorComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                resumeConnector={resumeConnector}
                isResumeConnectorPending={isResumeConnectorPending}
                connector={connector}
            />
        </>
    );
};

export default ResumeConnector;
