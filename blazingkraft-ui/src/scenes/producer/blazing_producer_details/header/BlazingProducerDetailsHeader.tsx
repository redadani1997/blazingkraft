import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import BlazingProducerDetailsHeaderComponent from './BlazingProducerDetailsHeaderComponent';

interface BlazingProducerDetailsHeaderProps {
    refreshPageContent: () => void;
}

const BlazingProducerDetailsHeader = ({
    refreshPageContent,
}: BlazingProducerDetailsHeaderProps) => {
    // Map State To Props
    const { isGetProducerCompleteConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetProducerCompleteConfigurationPending:
                    store.producerReducer
                        .isGetProducerCompleteConfigurationPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedEditProducerConfiguration } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        ProducerPermissions.PRODUCER_PERMISSIONS
                            .EDIT_PRODUCER_CONFIGURATION,
                },
            ],
        });

    return (
        <BlazingProducerDetailsHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={
                isGetProducerCompleteConfigurationPending
            }
            isAuthorizedEditProducerConfiguration={
                isAuthorizedEditProducerConfiguration
            }
        />
    );
};

export default BlazingProducerDetailsHeader;
