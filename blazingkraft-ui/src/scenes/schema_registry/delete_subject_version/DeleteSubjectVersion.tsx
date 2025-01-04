import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import schemaRegistryActions from '../redux/actions';
import DeleteSubjectVersionComponent from './DeleteSubjectVersionComponent';

interface DeleteSubjectVersionProps {
    subject: string;
    permanent: boolean;
    isModalOpen: boolean;
    setIsModalOpen: Function;
}

const DeleteSubjectVersion = (props: DeleteSubjectVersionProps) => {
    // Map State To Props
    const { isDeleteSubjectVersionPending, subjectDetails } = useSelector(
        (store: ReduxStore) => {
            return {
                isDeleteSubjectVersionPending:
                    store.schemaRegistryReducer.isDeleteSubjectVersionPending,
                subjectDetails: store.schemaRegistryReducer.subjectDetails,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode } = useParams();
    const navigate = useNavigate();

    const getSubjectDetails = () =>
        dispatch(
            schemaRegistryActions.getSubjectDetails(
                props.subject,
                schemaRegistryCode,
            ),
        );

    const deleteSchemaVersion = (subject, version, permanant) =>
        dispatch(
            schemaRegistryActions.deleteSchemaVersion(
                subject,
                version,
                permanant,
                schemaRegistryCode,
            ),
        ).then(() => {
            if (subjectDetails?.schemasMetaData.length > 1) {
                props.setIsModalOpen(false);
                getSubjectDetails().catch(() =>
                    navigate(
                        `/schema_registries/${schemaRegistryCode}/subjects`,
                    ),
                );
            }
            if (subjectDetails?.schemasMetaData.length === 1) {
                navigate(`/schema_registries/${schemaRegistryCode}/subjects`);
            }
        });

    return (
        <>
            {subjectDetails && (
                <DeleteSubjectVersionComponent
                    {...props}
                    subjectDetails={subjectDetails}
                    deleteSchemaVersion={deleteSchemaVersion}
                    isDeleteSubjectVersionPending={
                        isDeleteSubjectVersionPending
                    }
                />
            )}
        </>
    );
};

export default DeleteSubjectVersion;
