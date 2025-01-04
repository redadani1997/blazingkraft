import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import schemaRegistryActions from '../redux/actions';
import SubjectDetailsComponent from './SubjectDetailsComponent';

const SubjectDetails = () => {
    useDocumentTitle('Blazing KRaft - Subject Details');

    // Map State To Props
    const { isGetSubjectDetailsPending } = useSelector((store: ReduxStore) => {
        return {
            isGetSubjectDetailsPending:
                store.schemaRegistryReducer.isGetSubjectDetailsPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode, subject } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const getSubjectDetails = () =>
        dispatch(
            schemaRegistryActions.getSubjectDetails(
                subject,
                schemaRegistryCode,
            ),
        );

    useEffect(() => {
        getSubjectDetails().catch(() =>
            navigate(`/schema_registries/${schemaRegistryCode}/subjects`),
        );
    }, [location]);

    return (
        <>
            <LoadingSpinner isLoading={isGetSubjectDetailsPending} />
            <SubjectDetailsComponent />
        </>
    );
};

export default SubjectDetails;
