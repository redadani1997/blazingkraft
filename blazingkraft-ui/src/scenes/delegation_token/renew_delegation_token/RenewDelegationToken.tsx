import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import delegationTokenActions from '../redux/actions';
import RenewDelegationTokenComponent from './RenewDelegationTokenComponent';

interface RenewDelegationTokenProps {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
    delegationTokenToRenew: string;
}

const RenewDelegationToken = (props: RenewDelegationTokenProps) => {
    // Map State To Props
    const { isRenewDelegationTokenPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isRenewDelegationTokenPending:
                    store.delegationTokenReducer.isRenewDelegationTokenPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const renewDelegationToken = (hmac, renewTimePeriodMs) =>
        dispatch(
            delegationTokenActions.renewDelegationToken(
                hmac,
                renewTimePeriodMs,
                clusterCode,
            ),
        ).then(() => {
            props.setIsModalOpen(false);
            props.refreshPageContent();
        });

    return (
        <>
            <RenewDelegationTokenComponent
                {...props}
                renewDelegationToken={renewDelegationToken}
                isRenewDelegationTokenPending={isRenewDelegationTokenPending}
            />
        </>
    );
};

export default RenewDelegationToken;
