import { ITopicDetails } from 'common/types/topic';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import topicActions from '../redux/actions';
import DeleteTopicRecordsComponent from './DeleteTopicRecordsComponent';

interface DeleteTopicRecordsProps {
    topicToDeleteRecords: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    onSuccess: () => void;
    topicDetails: ITopicDetails;
}

const DeleteTopicRecords = ({
    topicToDeleteRecords,
    isModalOpen,
    setIsModalOpen,
    onSuccess,
    topicDetails,
}: DeleteTopicRecordsProps) => {
    // Map State To Props
    const { isDeleteTopicRecordsPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteTopicRecordsPending:
                store.topicReducer.isDeleteTopicRecordsPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { clusterCode } = useParams();

    const deleteTopicRecords = (
        partitionsOffset: { partition: number; offset: number }[],
    ) =>
        dispatch(
            topicActions.deleteTopicRecords(
                topicToDeleteRecords,
                partitionsOffset,
                clusterCode,
            ),
        ).then(() => {
            setIsModalOpen(false);
            onSuccess();
        });

    return (
        <>
            <DeleteTopicRecordsComponent
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                deleteTopicRecords={deleteTopicRecords}
                isDeleteTopicRecordsPending={isDeleteTopicRecordsPending}
                topicToDeleteRecords={topicToDeleteRecords}
                topicDetails={topicDetails}
            />
        </>
    );
};

export default DeleteTopicRecords;
