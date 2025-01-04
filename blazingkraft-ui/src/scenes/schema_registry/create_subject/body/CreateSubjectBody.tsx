import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import CreateSubjectBodyComponent from './CreateSubjectBodyComponent';

const CreateSubjectBody = () => {
    // Map State To Props
    // const { isCreateSubjectPending } = useSelector((store: ReduxStore) => {
    //     return {
    //         isCreateSubjectPending:
    //             store.schemaRegistryReducer.isCreateSubjectPending,
    //     };
    // }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode } = useParams();
    const navigate = useNavigate();

    const createSubject = (
        subject,
        schemaType,
        schema,
        schemaCompatibility,
        schemaReferences,
    ) =>
        dispatch(
            schemaRegistryActions.createSubject(
                subject,
                schemaType,
                schema,
                schemaCompatibility,
                schemaReferences,
                schemaRegistryCode,
            ),
        ).then(() =>
            navigate(
                `/schema_registries/${schemaRegistryCode}/subjects/${subject}`,
            ),
        );

    return (
        <>
            <CreateSubjectBodyComponent createSubject={createSubject} />
        </>
    );
};

export default CreateSubjectBody;
