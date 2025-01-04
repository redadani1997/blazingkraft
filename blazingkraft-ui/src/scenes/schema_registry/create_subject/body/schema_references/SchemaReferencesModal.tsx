import { SchemaReference } from 'common/types/schema_registry';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import schemaRegistryActions from 'scenes/schema_registry/redux/actions';
import SchemaReferencesModalComponent from './SchemaReferencesModalComponent';

interface SchemaReferencesModalProps {
    schemaReferences: SchemaReference[];
    setSchemaReferences: any;
}

const SchemaReferencesModal = ({
    schemaReferences,
    setSchemaReferences,
}: SchemaReferencesModalProps) => {
    // Map State To Props
    const { isGetSubjectsVersionsPending, subjectsVersions } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetSubjectsVersionsPending:
                    store.schemaRegistryReducer.isGetSubjectsVersionsPending,
                subjectsVersions: store.schemaRegistryReducer.subjectsVersions,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const { schemaRegistryCode } = useParams();

    const getSubjectsVersions = () =>
        dispatch(schemaRegistryActions.getSubjectsVersions(schemaRegistryCode));

    return (
        <SchemaReferencesModalComponent
            schemaReferences={schemaReferences}
            setSchemaReferences={setSchemaReferences}
            getSubjectsVersions={getSubjectsVersions}
            isGetSubjectsVersionsPending={isGetSubjectsVersionsPending}
            subjectsVersions={subjectsVersions}
        />
    );
};

export default SchemaReferencesModal;
