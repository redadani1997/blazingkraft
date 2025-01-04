import { KafkaPrincipal } from 'common/types/delegation_token';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import delegationTokenActions from '../redux/actions';
import CreateDelegationTokenComponent from './CreateDelegationTokenComponent';

interface CreateDelegationTokenProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
}

const CreateDelegationToken = (props: CreateDelegationTokenProps) => {
    // Map State To Props
    const { isCreateDelegationTokenPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isCreateDelegationTokenPending:
                    store.delegationTokenReducer.isCreateDelegationTokenPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const createDelegationToken = (
        owner: KafkaPrincipal,
        renewers: KafkaPrincipal[],
        maxLifeTimeMs,
    ) =>
        dispatch(
            delegationTokenActions.createDelegationToken(
                owner,
                renewers,
                maxLifeTimeMs,
                clusterCode,
            ),
        ).then(() => {
            props.setIsModalOpen(false);
            props.refreshPageContent();
        });

    return (
        <>
            <CreateDelegationTokenComponent
                {...props}
                createDelegationToken={createDelegationToken}
                isCreateDelegationTokenPending={isCreateDelegationTokenPending}
            />
        </>
    );
};

export default CreateDelegationToken;
