import { QuotaEntity, QuotaEntry, QuotaOperation } from 'common/types/quota';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import quotaActions, { QuotaAlterApiRequest } from '../redux/actions';
import AlterQuotasComponent from './AlterQuotasComponent';

interface AlterQuotasProps {
    quotaEntryToAlter: QuotaEntry;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    refreshPageContent: () => void;
}

const AlterQuotas = (props: AlterQuotasProps) => {
    // Map State To Props
    const { isAlterQuotasPending } = useSelector((store: ReduxStore) => {
        return {
            isAlterQuotasPending: store.quotaReducer.isAlterQuotasPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const alterQuotas = (
        entities: QuotaEntity[],
        operations: QuotaOperation[],
    ) => {
        const request: QuotaAlterApiRequest = {
            entities,
            operations,
            validateOnly: false,
        };
        return dispatch(quotaActions.alterQuotas(request, clusterCode)).then(
            () => {
                props.setIsModalOpen(false);
                props.refreshPageContent();
            },
        );
    };

    return (
        <>
            <AlterQuotasComponent
                {...props}
                alterQuotas={alterQuotas}
                isAlterQuotasPending={isAlterQuotasPending}
            />
        </>
    );
};

export default AlterQuotas;
