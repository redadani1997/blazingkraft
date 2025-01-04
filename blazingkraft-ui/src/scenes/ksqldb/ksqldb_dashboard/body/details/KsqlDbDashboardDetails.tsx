import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import KsqlDbDashboardDetailsComponent from './KsqlDbDashboardDetailsComponent';

const KsqlDbDashboardDetails = () => {
    // Map State To Props
    const { ksqlDbDetails } = useSelector((store: ReduxStore) => {
        return {
            ksqlDbDetails: store.ksqlDbReducer.ksqlDbDetails,
        };
    }, shallowEqual);

    return (
        <>
            <KsqlDbDashboardDetailsComponent ksqlDbDetails={ksqlDbDetails} />
        </>
    );
};

export default KsqlDbDashboardDetails;
