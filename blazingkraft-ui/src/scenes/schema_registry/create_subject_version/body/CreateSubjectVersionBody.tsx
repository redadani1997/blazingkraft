import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import CreateSubjectVersionBodyComponent from './CreateSubjectVersionBodyComponent';

const CreateSubjectVersionBody = () => {
    // Map State To Props
    const { subjectDetails } = useSelector((store: ReduxStore) => {
        return {
            subjectDetails: store.schemaRegistryReducer.subjectDetails,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode, subject } = useParams();
    const navigate = useNavigate();

    const createSubjectVersion = (schemaType, schema, schemaReferences) =>
        dispatch(
            schemaRegistryActions.createSubjectVersion(
                subject,
                schemaType,
                schema,
                schemaReferences,
                schemaRegistryCode,
            ),
        ).then(() =>
            navigate(
                `/schema_registries/${schemaRegistryCode}/subjects/${subject}/versions`,
            ),
        );

    return (
        <>
            {subjectDetails && (
                <CreateSubjectVersionBodyComponent
                    subjectDetails={subjectDetails}
                    createSubjectVersion={createSubjectVersion}
                />
            )}
        </>
    );
};

export default CreateSubjectVersionBody;
