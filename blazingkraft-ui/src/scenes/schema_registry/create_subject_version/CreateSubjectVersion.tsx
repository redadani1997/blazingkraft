import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import schemaRegistryActions from '../redux/actions';
import CreateSubjectVersionComponent from './CreateSubjectVersionComponent';

const CreateSubjectVersion = () => {
    useDocumentTitle('Blazing KRaft - Create Subject Version');

    // Map State To Props
    const {
        isDeleteSubjectPending,
        isGetSubjectDetailsPending,
        isCreateSubjectVersionPending,
    } = useSelector((store: ReduxStore) => {
        return {
            isGetSubjectDetailsPending:
                store.schemaRegistryReducer.isGetSubjectDetailsPending,
            isDeleteSubjectPending:
                store.schemaRegistryReducer.isDeleteSubjectPending,
            isCreateSubjectVersionPending:
                store.schemaRegistryReducer.isCreateSubjectVersionPending,
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
            <LoadingSpinner
                isLoading={
                    isDeleteSubjectPending ||
                    isGetSubjectDetailsPending ||
                    isCreateSubjectVersionPending
                }
            />
            <CreateSubjectVersionComponent />
        </>
    );
};

export default CreateSubjectVersion;
