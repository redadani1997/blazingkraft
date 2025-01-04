import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import SubjectsBodyComponent from './SubjectsBodyComponent';

const SubjectsBody = () => {
    // Map State To Props
    const {
        isGetSubjectsMetaPending,
        isGetSubjectsDescriptionPending,
        subjectsDescription,
        subjectsMeta,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetSubjectsMetaPending:
                store.schemaRegistryReducer.isGetSubjectsMetaPending,
            subjectsMeta: store.schemaRegistryReducer.subjectsMeta,
            isGetSubjectsDescriptionPending:
                store.schemaRegistryReducer.isGetSubjectsDescriptionPending,
            subjectsDescription:
                store.schemaRegistryReducer.subjectsDescription,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();
    // const { schemaRegistryCode } = useParams();
    // const navigate = useNavigate();

    // const action = () => dispatch(schemaRegistryActions.action());

    return (
        <SubjectsBodyComponent
            isGetSubjectsMetaPending={isGetSubjectsMetaPending}
            isGetSubjectsDescriptionPending={isGetSubjectsDescriptionPending}
            subjectsDescription={subjectsDescription}
            subjectsMeta={subjectsMeta}
        />
    );
};

export default SubjectsBody;
