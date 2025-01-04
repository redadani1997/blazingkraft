import { SchemaRegistryMode } from 'common/types/schema_registry';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import schemaRegistryActions from '../redux/actions';
import UpdateModeComponent from './UpdateModeComponent';

interface UpdateModeProps {
    target: string;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    isSubject: boolean;
    initialMode: SchemaRegistryMode;
}

const UpdateMode = (props: UpdateModeProps) => {
    // Map State To Props
    const {
        isUpdateSubjectModePending,
        isUpdateSchemaRegistryModePending,
        subjectsMeta,
    } = useSelector((store: ReduxStore) => {
        return {
            isUpdateSchemaRegistryModePending:
                store.schemaRegistryReducer.isUpdateSchemaRegistryModePending,
            isUpdateSubjectModePending:
                store.schemaRegistryReducer.isUpdateSubjectModePending,
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

    const updateSubjectMode = (target, compatibility) =>
        dispatch(
            schemaRegistryActions.updateSubjectMode(
                target,
                compatibility,
                schemaRegistryCode,
            ),
        );

    const updateSchemaRegistrytMode = (target, compatibility) =>
        dispatch(
            schemaRegistryActions.updateSchemaRegistrytMode(
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
            <UpdateModeComponent
                {...props}
                target={props.target}
                updateMode={
                    props.isSubject
                        ? updateSubjectMode
                        : updateSchemaRegistrytMode
                }
                isUpdateModePending={
                    isUpdateSubjectModePending ||
                    isUpdateSchemaRegistryModePending
                }
            />
        </>
    );
};

export default UpdateMode;
