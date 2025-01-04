import { ConsumerGroupPermissions } from 'common/permissions/cluster/ConsumerGroupPermissions';
import { OffsetPermissions } from 'common/permissions/cluster/OffsetPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import ConsumerGroupDetailsHeaderComponent from './ConsumerGroupDetailsHeaderComponent';

interface ConsumerGroupDetailsHeaderProps {
    refreshPageContent: () => void;
    setIsAlterConsumerGroupOffsetsModalOpened: Function;
    setTopicPartitionOffsetsToAlter: Function;
}

const ConsumerGroupDetailsHeader = (props: ConsumerGroupDetailsHeaderProps) => {
    // Map State To Props
    const { isDescribeConsumerGroupPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isDescribeConsumerGroupPending:
                    store.consumerGroupReducer.isDescribeConsumerGroupPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedAlterConsumerGroupOffsets } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        OffsetPermissions.OFFSET_PERMISSIONS
                            .ALTER_CONSUMER_GROUP_OFFSETS,
                },
            ],
        });
    const { isAuthorized: isAuthorizedClearConsumerGroupOffsets } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        OffsetPermissions.OFFSET_PERMISSIONS
                            .CLEAR_CONSUMER_GROUP_OFFSETS,
                },
            ],
        });
    const { isAuthorized: isAuthorizedDeleteConsumerGroup } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'CLUSTER',
                permission:
                    ConsumerGroupPermissions.CONSUMER_GROUP_PERMISSIONS
                        .DELETE_CONSUMER_GROUP,
            },
        ],
    });
    const { isAuthorized: isAuthorizedRemoveConsumerGroupMember } =
        useAuthorization({
            requiredPermissions: [
                {
                    authorizationType: 'CLUSTER',
                    permission:
                        ConsumerGroupPermissions.CONSUMER_GROUP_PERMISSIONS
                            .REMOVE_CONSUMER_GROUP_MEMBER,
                },
            ],
        });

    return (
        <ConsumerGroupDetailsHeaderComponent
            {...props}
            isRefreshPageContentPending={isDescribeConsumerGroupPending}
            isAuthorizedAlterConsumerGroupOffsets={
                isAuthorizedAlterConsumerGroupOffsets
            }
            isAuthorizedClearConsumerGroupOffsets={
                isAuthorizedClearConsumerGroupOffsets
            }
            isAuthorizedDeleteConsumerGroup={isAuthorizedDeleteConsumerGroup}
            isAuthorizedRemoveConsumerGroupMember={
                isAuthorizedRemoveConsumerGroupMember
            }
        />
    );
};

export default ConsumerGroupDetailsHeader;
