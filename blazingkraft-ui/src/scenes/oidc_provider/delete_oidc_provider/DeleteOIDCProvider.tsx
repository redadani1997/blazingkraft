import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import { OIDCProvider } from '../redux';
import OIDCProviderActions from '../redux/actions';
import DeleteOIDCProviderComponent from './DeleteOIDCProviderComponent';

interface DeleteOIDCProviderProps {
    OIDCProviderToDelete: OIDCProvider;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
}

const DeleteOIDCProvider = ({
    OIDCProviderToDelete,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
}: DeleteOIDCProviderProps) => {
    // Map State To Props
    const { isDeleteOIDCProviderPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteOIDCProviderPending:
                store.OIDCProviderReducer.isDeleteOIDCProviderPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const deleteOIDCProvider = () =>
        dispatch(
            OIDCProviderActions.deleteOIDCProvider(
                OIDCProviderToDelete?.code,
                OIDCProviderToDelete?.name,
            ),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteOIDCProviderComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteOIDCProvider={deleteOIDCProvider}
                isDeleteOIDCProviderPending={isDeleteOIDCProviderPending}
                OIDCProviderName={OIDCProviderToDelete?.name}
            />
        </>
    );
};

export default DeleteOIDCProvider;
