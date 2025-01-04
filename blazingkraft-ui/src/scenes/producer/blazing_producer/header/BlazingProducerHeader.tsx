import { ProducerPermissions } from 'common/permissions/cluster/ProducerPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import BlazingProducerHeaderComponent from './BlazingProducerHeaderComponent';

interface BlazingProducerHeaderProps {
    topic: string;
    refreshPageContent: () => void;
    setIsImportBlazingRecordsModalOpen: (isOpen: boolean) => void;
}

const BlazingProducerHeader = ({
    topic,
    refreshPageContent,
    setIsImportBlazingRecordsModalOpen,
}: BlazingProducerHeaderProps) => {
    // Map State To Props
    const { isGetProducerConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetProducerConfigurationPending:
                    store.producerReducer.isGetProducerConfigurationPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedDescribeProducerConfiguration } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        ProducerPermissions.PRODUCER_PERMISSIONS
                            .DESCRIBE_PRODUCER_CONFIGURATION,
                },
            ],
        });
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
        <BlazingProducerHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetProducerConfigurationPending}
            topic={topic}
            isAuthorizedDescribeProducerConfiguration={
                isAuthorizedDescribeProducerConfiguration
            }
            isAuthorizedEditProducerConfiguration={
                isAuthorizedEditProducerConfiguration
            }
            setIsImportBlazingRecordsModalOpen={
                setIsImportBlazingRecordsModalOpen
            }
        />
    );
};

export default BlazingProducerHeader;
