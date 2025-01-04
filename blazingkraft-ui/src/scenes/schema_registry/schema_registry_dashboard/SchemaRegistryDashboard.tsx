import { useDocumentTitle } from '@mantine/hooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import clusterActions from '../redux/actions';
import SchemaRegistryDashboardComponent from './SchemaRegistryDashboardComponent';

const SchemaRegistryDashboard = () => {
    useDocumentTitle('Blazing KRaft - Schema Registry Dashboard');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode } = useParams();

    const refreshPageContent = () =>
        dispatch(clusterActions.getSchemaRegistryDetails(schemaRegistryCode));

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <SchemaRegistryDashboardComponent
            refreshPageContent={refreshPageContent}
        />
    );
};

export default SchemaRegistryDashboard;
