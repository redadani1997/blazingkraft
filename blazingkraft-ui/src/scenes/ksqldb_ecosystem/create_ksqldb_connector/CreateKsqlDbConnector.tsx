import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import ksqlDbEcosystemActions from 'scenes/ksqldb_ecosystem/redux/actions';
import CreateKsqlDbConnectorComponent from './CreateKsqlDbConnectorComponent';

interface CreateKsqlDbConnectorProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
}

const CreateKsqlDbConnector = (props: CreateKsqlDbConnectorProps) => {
    // Map State To Props
    const { isCreateKsqlDbConnectorPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isCreateKsqlDbConnectorPending:
                    store.ksqlDbEcosystemReducer.isCreateKsqlDbConnectorPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const createKsqlDbConnector = (connectorName, isSource, properties) =>
        dispatch(
            ksqlDbEcosystemActions.createKsqlDbConnector(
                ksqlDbCode,
                connectorName,
                isSource,
                properties,
            ),
        ).then(() => {
            props.setIsModalOpen(false);
            props.refreshPageContent();
        });

    return (
        <>
            <CreateKsqlDbConnectorComponent
                {...props}
                createKsqlDbConnector={createKsqlDbConnector}
                isCreateKsqlDbConnectorPending={isCreateKsqlDbConnectorPending}
            />
        </>
    );
};

export default CreateKsqlDbConnector;
