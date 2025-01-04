import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import KsqlDbDashboardBodyComponent from './KsqlDbDashboardBodyComponent';

interface KsqlDbDashboardBodyProps {
    jmxEnabled: boolean;
}

const KsqlDbDashboardBody = ({ jmxEnabled }: KsqlDbDashboardBodyProps) => {
    // Map State To Props
    const { isGetKsqlDbDetailsPending, ksqlDbDetails } = useSelector(
        (store: ReduxStore) => {
            return {
                ksqlDbDetails: store.ksqlDbReducer.ksqlDbDetails,
                isGetKsqlDbDetailsPending:
                    store.ksqlDbReducer.isGetKsqlDbDetailsPending,
            };
        },
        shallowEqual,
    );

    return (
        <>
            {CommonValidationUtils.isTruthy(ksqlDbDetails) && (
                <KsqlDbDashboardBodyComponent jmxEnabled={jmxEnabled} />
            )}
            <LoadingSpinner isLoading={isGetKsqlDbDetailsPending} />
        </>
    );
};

export default KsqlDbDashboardBody;
