import { DataMaskingPermissions } from 'common/permissions/management/DataMaskingPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import { IDataMasking } from 'scenes/data_masking/redux';
import AllDataMaskingsBodyComponent from './AllDataMaskingsBodyComponent';

interface AllDataMaskingsBodyProps {
    setDataMaskingToDelete: (dataMasking: string) => void;
    setIsDeleteDataMaskingModalOpen: (isModalOpen: boolean) => void;
    setDataMaskingToEdit: (dataMasking: IDataMasking) => void;
    setIsEditDataMaskingModalOpen: (isModalOpen: boolean) => void;
}

const AllDataMaskingsBody = (props: AllDataMaskingsBodyProps) => {
    // Map State To Props
    const { dataMaskings, isGetAllDataMaskingsPending } = useSelector(
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

    // Authorization
    const { isAuthorized: isAuthorizedDeleteDataMasking } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    DataMaskingPermissions.DATA_MASKING_PERMISSIONS
                        .DELETE_DATA_MASKING,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditDataMasking } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission:
                    DataMaskingPermissions.DATA_MASKING_PERMISSIONS
                        .EDIT_DATA_MASKING,
            },
        ],
    });

    return (
        <AllDataMaskingsBodyComponent
            {...props}
            isGetAllDataMaskingsPending={isGetAllDataMaskingsPending}
            dataMaskings={dataMaskings}
            isAuthorizedDeleteDataMasking={isAuthorizedDeleteDataMasking}
            isAuthorizedEditDataMasking={isAuthorizedEditDataMasking}
        />
    );
};

export default AllDataMaskingsBody;
