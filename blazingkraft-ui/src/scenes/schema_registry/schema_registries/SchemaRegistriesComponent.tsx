import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteSchemaRegistry from '../delete_schema_registry/DeleteSchemaRegistry';
import SchemaRegistriesBody from './body/SchemaRegistriesBody';
import SchemaRegistriesHeader from './header/SchemaRegistriesHeader';

interface SchemaRegistriesComponentProps {
    refreshPageContent: () => void;
}

function SchemaRegistriesComponent({
    refreshPageContent,
}: SchemaRegistriesComponentProps) {
    const [schemaRegistryToDelete, setSchemaRegistryToDelete] = useState<
        string | null
    >(null);
    const [
        isDeleteSchemaRegistryModalOpen,
        setIsDeleteSchemaRegistryModalOpen,
    ] = useState(false);
    return (
        <>
            <SchemaRegistriesHeader />
            <CommonBody>
                <SchemaRegistriesBody
                    setSchemaRegistryToDelete={setSchemaRegistryToDelete}
                    setIsDeleteSchemaRegistryModalOpen={
                        setIsDeleteSchemaRegistryModalOpen
                    }
                />
            </CommonBody>
            <DeleteSchemaRegistry
                schemaRegistryToDelete={schemaRegistryToDelete}
                isModalOpen={isDeleteSchemaRegistryModalOpen}
                setIsModalOpen={setIsDeleteSchemaRegistryModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default SchemaRegistriesComponent;
