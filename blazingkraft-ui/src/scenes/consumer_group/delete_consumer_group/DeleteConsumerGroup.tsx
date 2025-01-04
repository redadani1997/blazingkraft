import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import consumerGroupActions from '../redux/actions';
import DeleteConsumerGroupComponent from './DeleteConsumerGroupComponent';

interface DeleteConsumerGroupProps {
    consumerGroup: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const DeleteConsumerGroup = (props: DeleteConsumerGroupProps) => {
    // Map State To Props
    const { isDeleteConsumerGroupPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isDeleteConsumerGroupPending:
                    store.consumerGroupReducer.isDeleteConsumerGroupPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode, consumerGroup } = useParams();
    const navigate = useNavigate();

    const deleteConsumerGroup = () =>
        dispatch(
            consumerGroupActions.deleteConsumerGroup(
                consumerGroup,
                clusterCode,
            ),
        ).then(() => navigate(`/clusters/${clusterCode}/consumer_groups`));

    return (
        <>
            <DeleteConsumerGroupComponent
                {...props}
                deleteConsumerGroup={deleteConsumerGroup}
                isDeleteConsumerGroupPending={isDeleteConsumerGroupPending}
            />
        </>
    );
};

export default DeleteConsumerGroup;
