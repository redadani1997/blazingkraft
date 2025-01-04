import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import OIDCProviderDetailsBodyComponent from './OIDCProviderDetailsBodyComponent';

const OIDCProviderDetailsBody = () => {
    // Map State To Props
    const {
        OIDCProviderDetails,
        isGetOIDCProviderDetailsPending,
        OIDCProviderWellKnownConfiguration,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetOIDCProviderDetailsPending:
                store.OIDCProviderReducer.isGetOIDCProviderDetailsPending,
            OIDCProviderDetails: store.OIDCProviderReducer.OIDCProviderDetails,
            OIDCProviderWellKnownConfiguration:
                store.OIDCProviderReducer.OIDCProviderWellKnownConfiguration,
        };
    }, shallowEqual);

    // Map Dispatch To Props

    if (CommonValidationUtils.isFalsy(OIDCProviderDetails)) {
        return null;
    }

    return (
        <>
            <OIDCProviderDetailsBodyComponent
                OIDCProviderDetails={OIDCProviderDetails}
                OIDCProviderWellKnownConfiguration={
                    OIDCProviderWellKnownConfiguration
                }
            />
            <LoadingSpinner isLoading={isGetOIDCProviderDetailsPending} />
        </>
    );
};

export default OIDCProviderDetailsBody;
