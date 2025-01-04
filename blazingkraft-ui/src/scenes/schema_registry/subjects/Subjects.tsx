import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import schemaRegistryActions from '../redux/actions';
import SubjectsComponent from './SubjectsComponent';

const Subjects = () => {
    useDocumentTitle('Blazing KRaft - Subjects');

    // Map State To Props
    // const { isGetSubjectsMetaPending, subjects } = useSelector(
    //     (store: ReduxStore) => {
    //         return {
    //             isGetSubjectsMetaPending:
    //                 store.schemaRegistryReducer.isGetSubjectsMetaPending,
    //             subjects: store.schemaRegistryReducer.subjects,
    //         };
    //     }, shallowEqual,
    // );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode } = useParams();

    const getSchemaRegistryConfig = () =>
        dispatch(
            schemaRegistryActions.getSchemaRegistryConfig(schemaRegistryCode),
        );

    const getSubjectsMeta = () =>
        dispatch(schemaRegistryActions.getSubjectsMeta(schemaRegistryCode));

    const getSubjectsDescription = subjects =>
        dispatch(
            schemaRegistryActions.getSubjectsDescription(
                subjects,
                schemaRegistryCode,
            ),
        );

    const refreshPageContent = () => {
        getSchemaRegistryConfig();
        getSubjectsMeta().then(({ value }: { value }) => {
            const subjects = value.map(subject => subject.subject);
            if (subjects.length > 0) {
                return getSubjectsDescription(subjects);
            }
        });
    };

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <SubjectsComponent refreshPageContent={refreshPageContent} />;
};

export default Subjects;
