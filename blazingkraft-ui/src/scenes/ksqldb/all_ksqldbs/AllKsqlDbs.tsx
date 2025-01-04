import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { KsqlDbMeta } from '../redux';
import ksqlDbActions from '../redux/actions';
import AllKsqlDbsComponent from './AllKsqlDbsComponent';

const AllKsqlDbs = () => {
    useDocumentTitle('Blazing KRaft - KsqlDbs');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getAllKsqlDbs = () => dispatch(ksqlDbActions.getAllKsqlDbs());
    const getKsqlDbDescription = code =>
        dispatch(ksqlDbActions.getKsqlDbDescription(code));

    const refreshPageContent = () =>
        getAllKsqlDbs().then(({ value }: { value: KsqlDbMeta[] }) =>
            value.map(ksqlDb => getKsqlDbDescription(ksqlDb.code)),
        );

    useEffect(() => {
        refreshPageContent();
    }, []);

    return <AllKsqlDbsComponent refreshPageContent={refreshPageContent} />;
};

export default AllKsqlDbs;
