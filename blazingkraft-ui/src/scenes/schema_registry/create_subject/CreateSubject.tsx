import { useDocumentTitle } from '@mantine/hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import CreateSubjectComponent from './CreateSubjectComponent';

const CreateSubject = () => {
    useDocumentTitle('Blazing KRaft - Create Subject');

    // Map State To Props
    const { isCreateSubjectPending } = useSelector((store: ReduxStore) => {
        return {
            isCreateSubjectPending:
                store.schemaRegistryReducer.isCreateSubjectPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();
    // const { schemaRegistryCode } = useParams();
    // const navigate = useNavigate();

    // const action = () => dispatch(schemaRegistryActions.action());

    // useEffect(() => {
    //     action();
    // }, []);

    return (
        <>
            <LoadingSpinner isLoading={isCreateSubjectPending} />
            <CreateSubjectComponent />
        </>
    );
};

export default CreateSubject;
