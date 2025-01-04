import CreateSubjectHeaderComponent from './CreateSubjectHeaderComponent';

const CreateSubjectHeader = () => {
    // Map State To Props
    // const { isRefreshPageContentPending } = useSelector((store: ReduxStore) => {
    //     return {
    //         isRefreshPageContentPending: store.isRefreshPageContentPending,
    //     };
    // }, shallowEqual);

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();
    // const { schemaRegistryCode } = useParams();
    // const navigate = useNavigate();

    // const refreshPageContent = () => dispatch(schemaRegistryActions.refreshPageContent());

    return (
        <CreateSubjectHeaderComponent
        // refreshPageContent={refreshPageContent}
        // isRefreshPageContentPending={isRefreshPageContentPending}
        />
    );
};

export default CreateSubjectHeader;
