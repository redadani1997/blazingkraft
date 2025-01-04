import { SchemaCompatibility } from 'common/types/schema_registry';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import schemaRegistryActions from '../redux/actions';
import UpdateCompatibilityComponent from './UpdateCompatibilityComponent';

interface UpdateCompatibilityProps {
    target: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    initialCompatibility: SchemaCompatibility;
    isSubject: boolean;
}

const UpdateCompatibility = (props: UpdateCompatibilityProps) => {
    // Map State To Props
    const {
        isUpdateSubjectCompatibilityPending,
        isUpdateSchemaRegsitryCompatibilityPending,
        subjectsMeta,
    } = useSelector((store: ReduxStore) => {
        return {
            isUpdateSubjectCompatibilityPending:
                store.schemaRegistryReducer.isUpdateSubjectCompatibilityPending,
            isUpdateSchemaRegsitryCompatibilityPending:
                store.schemaRegistryReducer
                    .isUpdateSchemaRegsitryCompatibilityPending,
            subjectsMeta: store.schemaRegistryReducer.subjectsMeta,
        };
    }, shallowEqual);

    const subjects: string[] = subjectsMeta.map(subject => subject.subject);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode } = useParams();

    const getSubjectsDescription = () =>
        dispatch(
            schemaRegistryActions.getSubjectsDescription(
                subjects,
                schemaRegistryCode,
            ),
        );

    const updateSubjectCompatibility = (target, compatibility) =>
        dispatch(
            schemaRegistryActions.updateSubjectCompatibility(
                target,
                compatibility,
                schemaRegistryCode,
            ),
        );

    const updateSchemaRegistryCompatibility = (target, compatibility) =>
        dispatch(
            schemaRegistryActions.updateSchemaRegistryCompatibility(
                compatibility,
                schemaRegistryCode,
            ),
        ).then(res => {
            if (subjects.length > 0) {
                return getSubjectsDescription();
            }
            return res;
        });

    return (
        <>
            <UpdateCompatibilityComponent
                {...props}
                updateSubjectCompatibility={
                    props.isSubject
                        ? updateSubjectCompatibility
                        : updateSchemaRegistryCompatibility
                }
                isUpdateSubjectCompatibilityPending={
                    isUpdateSubjectCompatibilityPending ||
                    isUpdateSchemaRegsitryCompatibilityPending
                }
            />
        </>
    );
};

export default UpdateCompatibility;
