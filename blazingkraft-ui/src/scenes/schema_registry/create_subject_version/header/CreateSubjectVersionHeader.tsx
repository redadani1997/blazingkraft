import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import CreateSubjectVersionHeaderComponent from './CreateSubjectVersionHeaderComponent';

const CreateSubjectVersionHeader = () => {
    // Map State To Props
    const { isGetSubjectDetailsPending, subjectDetails } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetSubjectDetailsPending:
                    store.schemaRegistryReducer.isGetSubjectDetailsPending,
                subjectDetails: store.schemaRegistryReducer.subjectDetails,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode, subject } = useParams();
    const navigate = useNavigate();

    const refreshPageContent = () =>
        dispatch(
            schemaRegistryActions.getSubjectDetails(
                subject,
                schemaRegistryCode,
            ),
        ).catch(() => {
            navigate(`/schema_registries/${schemaRegistryCode}/subjects`);
        });

    return (
        <CreateSubjectVersionHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetSubjectDetailsPending}
            subjectDetails={subjectDetails}
        />
    );
};

export default CreateSubjectVersionHeader;
