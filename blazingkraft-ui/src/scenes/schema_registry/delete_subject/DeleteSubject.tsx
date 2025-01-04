import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import schemaRegistryActions from '../redux/actions';
import DeleteSubjectComponent from './DeleteSubjectComponent';

interface DeleteSubjectProps {
    subject: string;
    permanent: boolean;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const DeleteSubject = (props: DeleteSubjectProps) => {
    // Map State To Props
    const { isDeleteSubjectPending } = useSelector((store: ReduxStore) => {
        return {
            isDeleteSubjectPending:
                store.schemaRegistryReducer.isDeleteSubjectPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode } = useParams();
    const navigate = useNavigate();

    const deleteSubject = (subject, permanant) =>
        dispatch(
            schemaRegistryActions.deleteSubject(
                subject,
                permanant,
                schemaRegistryCode,
            ),
        ).then(() =>
            navigate(`/schema_registries/${schemaRegistryCode}/subjects`),
        );

    return (
        <>
            <DeleteSubjectComponent
                {...props}
                deleteSubject={deleteSubject}
                isDeleteSubjectPending={isDeleteSubjectPending}
            />
        </>
    );
};

export default DeleteSubject;
