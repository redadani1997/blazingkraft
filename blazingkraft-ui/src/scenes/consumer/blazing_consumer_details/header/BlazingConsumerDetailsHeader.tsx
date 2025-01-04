import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import BlazingConsumerDetailsHeaderComponent from './BlazingConsumerDetailsHeaderComponent';

interface BlazingConsumerDetailsHeaderProps {
    refreshPageContent: () => void;
}

const BlazingConsumerDetailsHeader = ({
    refreshPageContent,
}: BlazingConsumerDetailsHeaderProps) => {
    // Map State To Props
    const { isGetConsumerCompleteConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetConsumerCompleteConfigurationPending:
                    store.consumerReducer
                        .isGetConsumerCompleteConfigurationPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedEditConsumerConfiguration } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        ConsumerPermissions.CONSUMER_PERMISSIONS
                            .EDIT_CONSUMER_CONFIGURATION,
                },
            ],
        });

    return (
        <BlazingConsumerDetailsHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={
                isGetConsumerCompleteConfigurationPending
            }
            isAuthorizedEditConsumerConfiguration={
                isAuthorizedEditConsumerConfiguration
            }
        />
    );
};

export default BlazingConsumerDetailsHeader;
