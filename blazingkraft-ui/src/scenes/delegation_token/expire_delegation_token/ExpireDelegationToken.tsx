import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import delegationTokenActions from '../redux/actions';
import ExpireDelegationTokenComponent from './ExpireDelegationTokenComponent';

interface ExpireDelegationTokenProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
    delegationTokenToExpire: string;
}

const ExpireDelegationToken = (props: ExpireDelegationTokenProps) => {
    // Map State To Props
    const { isExpireDelegationTokenPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isExpireDelegationTokenPending:
                    store.delegationTokenReducer.isExpireDelegationTokenPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const expireDelegationToken = (hmac, expiryTimePeriodMs) =>
        dispatch(
            delegationTokenActions.expireDelegationToken(
                hmac,
                expiryTimePeriodMs,
                clusterCode,
            ),
        ).then(() => {
            props.setIsModalOpen(false);
            props.refreshPageContent();
        });

    return (
        <>
            <ExpireDelegationTokenComponent
                {...props}
                expireDelegationToken={expireDelegationToken}
                isExpireDelegationTokenPending={isExpireDelegationTokenPending}
            />
        </>
    );
};

export default ExpireDelegationToken;
