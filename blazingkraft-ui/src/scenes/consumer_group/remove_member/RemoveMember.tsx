import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import consumerGroupActions from '../redux/actions';
import RemoveMemberComponent from './RemoveMemberComponent';

interface RemoveMemberProps {
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const RemoveMember = (props: RemoveMemberProps) => {
    // Map State To Props
    const { isDeleteMemberPending, consumerGroupDescription } = useSelector(
        (store: ReduxStore) => {
            return {
                isDeleteMemberPending:
                    store.consumerGroupReducer.isDeleteMemberPending,
                consumerGroupDescription:
                    store.consumerGroupReducer.consumerGroupDescription,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, consumerGroup } = useParams();

    const describeConsumerGroup = () =>
        dispatch(
            consumerGroupActions.describeConsumerGroup(
                consumerGroup,
                clusterCode,
            ),
        );
    const removeConsumerGroupMember = member =>
        dispatch(
            consumerGroupActions.removeConsumerGroupMember(
                consumerGroup,
                member,
                clusterCode,
            ),
        ).then(() => {
            props.setIsModalOpen(false);
            return describeConsumerGroup();
        });

    return (
        <>
            <RemoveMemberComponent
                {...props}
                removeConsumerGroupMember={removeConsumerGroupMember}
                isDeleteMemberPending={isDeleteMemberPending}
                consumerGroupDescription={consumerGroupDescription}
                consumerGroup={consumerGroup}
            />
        </>
    );
};

export default RemoveMember;
