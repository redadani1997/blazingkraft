import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import SchemaRegistryDashboardBodyComponent from './SchemaRegistryDashboardBodyComponent';

const SchemaRegistryDashboardBody = () => {
    // Map State To Props
    const { schemaRegistryDetails, isGetSchemaRegistryDetailsPending } =
        useSelector((store: ReduxStore) => {
            return {
                schemaRegistryDetails:
                    store.schemaRegistryReducer.schemaRegistryDetails,
                isGetSchemaRegistryDetailsPending:
                    store.schemaRegistryReducer
                        .isGetSchemaRegistryDetailsPending,
            };
        }, shallowEqual);

    // Map Dispatch To Props

    return (
        <>
            {CommonValidationUtils.isTruthy(schemaRegistryDetails) && (
                <SchemaRegistryDashboardBodyComponent
                    schemaRegistryDetails={schemaRegistryDetails}
                />
            )}
            <LoadingSpinner isLoading={isGetSchemaRegistryDetailsPending} />
        </>
    );
};

export default SchemaRegistryDashboardBody;
