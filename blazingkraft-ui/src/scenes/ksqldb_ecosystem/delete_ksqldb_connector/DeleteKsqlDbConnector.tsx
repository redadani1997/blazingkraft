import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import ksqlDbEcosystemActions from 'scenes/ksqldb_ecosystem/redux/actions';
import DeleteKsqlDbConnectorComponent from './DeleteKsqlDbConnectorComponent';

interface DeleteKsqlDbConnectorProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
    connectorNameToDelete: string;
}

const DeleteKsqlDbConnector = (props: DeleteKsqlDbConnectorProps) => {
    // Map State To Props
    const { isDeleteKsqlDbConnectorPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isDeleteKsqlDbConnectorPending:
                    store.ksqlDbEcosystemReducer.isDeleteKsqlDbConnectorPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { ksqlDbCode } = useParams();

    const deleteKsqlDbConnector = () =>
        dispatch(
            ksqlDbEcosystemActions.deleteKsqlDbConnector(
                ksqlDbCode,
                props.connectorNameToDelete,
            ),
        ).then(() => {
            props.setIsModalOpen(false);
            props.refreshPageContent();
        });

    return (
        <>
            <DeleteKsqlDbConnectorComponent
                {...props}
                deleteKsqlDbConnector={deleteKsqlDbConnector}
                isDeleteKsqlDbConnectorPending={isDeleteKsqlDbConnectorPending}
            />
        </>
    );
};

export default DeleteKsqlDbConnector;
