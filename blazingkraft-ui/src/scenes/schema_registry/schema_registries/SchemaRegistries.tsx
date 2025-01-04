import { useDocumentTitle } from '@mantine/hooks';
import { SchemaRegistry } from 'common/types/schema_registry';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import schemaRegistryActions from '../redux/actions';
import SchemaRegistriesComponent from './SchemaRegistriesComponent';

const SchemaRegistries = () => {
    useDocumentTitle('Blazing KRaft - Schema Registries');

    // Map State To Props

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getSchemaRegistries = () =>
        dispatch(schemaRegistryActions.getSchemaRegistries());

    const describeSchemaRegistry = schemaRegistryCode =>
        dispatch(
            schemaRegistryActions.describeSchemaRegistry(schemaRegistryCode),
        );

    const refreshPageContent = () =>
        getSchemaRegistries().then(({ value }: { value: SchemaRegistry[] }) =>
            value.map(schemaRegistry =>
                describeSchemaRegistry(schemaRegistry.code),
            ),
        );

    useEffect(() => {
        refreshPageContent();
    }, []);

    return (
        <>
            <SchemaRegistriesComponent
                refreshPageContent={refreshPageContent}
            />
        </>
    );
};

export default SchemaRegistries;
