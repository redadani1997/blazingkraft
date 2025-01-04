import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import SchemaRegistryDashboardDetailsComponent from './SchemaRegistryDashboardDetailsComponent';

const SchemaRegistryDashboardDetails = () => {
    // Map State To Props
    const { schemaRegistryDetails } = useSelector((store: ReduxStore) => {
        return {
            schemaRegistryDetails:
                store.schemaRegistryReducer.schemaRegistryDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            <SchemaRegistryDashboardDetailsComponent
                schemaRegistryDetails={schemaRegistryDetails}
            />
        </>
    );
};

export default SchemaRegistryDashboardDetails;
