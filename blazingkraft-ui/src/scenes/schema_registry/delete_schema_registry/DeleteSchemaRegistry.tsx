import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import schemaRegistryActions from '../redux/actions';
import DeleteSchemaRegistryComponent from './DeleteSchemaRegistryComponent';

interface DeleteSchemaRegistryProps {
    schemaRegistryToDelete: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteSchemaRegistry = ({
    schemaRegistryToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteSchemaRegistryProps) => {
    // Map State To Props
    const { isDeleteSchemaRegistryPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isDeleteSchemaRegistryPending:
                    store.schemaRegistryReducer.isDeleteSchemaRegistryPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteSchemaRegistry = () =>
        dispatch(
            schemaRegistryActions.deleteSchemaRegistry(schemaRegistryToDelete),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteSchemaRegistryComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteSchemaRegistry={deleteSchemaRegistry}
                isDeleteSchemaRegistryPending={isDeleteSchemaRegistryPending}
                schemaRegistryToDelete={schemaRegistryToDelete}
            />
        </>
    );
};

export default DeleteSchemaRegistry;
