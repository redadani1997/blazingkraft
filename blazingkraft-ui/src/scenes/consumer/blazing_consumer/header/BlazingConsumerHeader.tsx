import { ConsumerPermissions } from 'common/permissions/cluster/ConsumerPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import BlazingConsumerHeaderComponent from './BlazingConsumerHeaderComponent';

interface BlazingConsumerHeaderProps {
    topics: string[];
    refreshPageContent: () => void;
}

const BlazingConsumerHeader = ({
    topics,
    refreshPageContent,
}: BlazingConsumerHeaderProps) => {
    // Map State To Props
    const { isGetConsumerConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetConsumerConfigurationPending:
                    store.consumerReducer.isGetConsumerConfigurationPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedDescribeConsumerConfiguration } =
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
    const { isAuthorized: isAuthorizedEditConsumerConfiguration } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        ConsumerPermissions.CONSUMER_PERMISSIONS
                            .DESCRIBE_CONSUMER_CONFIGURATION,
                },
            ],
        });

    return (
        <BlazingConsumerHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetConsumerConfigurationPending}
            topics={topics}
            isAuthorizedEditConsumerConfiguration={
                isAuthorizedEditConsumerConfiguration
            }
            isAuthorizedDescribeConsumerConfiguration={
                isAuthorizedDescribeConsumerConfiguration
            }
        />
    );
};

export default BlazingConsumerHeader;
