import { DataMaskingPermissions } from 'common/permissions/management/DataMaskingPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllDataMaskingsHeaderComponent from './AllDataMaskingsHeaderComponent';

interface AllDataMaskingsHeaderProps {
    refreshPageContent: () => void;
}

const AllDataMaskingsHeader = ({
    refreshPageContent,
}: AllDataMaskingsHeaderProps) => {
    // Map State To Props
    const { isGetAllDataMaskingsPending, dataMaskings } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllDataMaskingsPending:
                    store.dataMaskingReducer.isGetAllDataMaskingsPending,
                dataMaskings: store.dataMaskingReducer.dataMaskings,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    const { isAuthorized: isAuthorizedCreateDataMasking } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    DataMaskingPermissions.DATA_MASKING_PERMISSIONS
                        .CREATE_DATA_MASKING,
            },
        ],
    });

    return (
        <AllDataMaskingsHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetAllDataMaskingsPending}
            dataMaskingsLength={dataMaskings.length}
            isAuthorizedCreateDataMasking={isAuthorizedCreateDataMasking}
        />
    );
};

export default AllDataMaskingsHeader;
