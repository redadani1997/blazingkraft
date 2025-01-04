import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditSchemaRegistryHeaderComponent from './EditSchemaRegistryHeaderComponent';

interface EditSchemaRegistryHeaderProps {
    refreshPageContent: () => void;
}

const EditSchemaRegistryHeader = ({
    refreshPageContent,
}: EditSchemaRegistryHeaderProps) => {
    // Map State To Props
    const { isGetSchemaRegistryDetailsPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetSchemaRegistryDetailsPending:
                    store.schemaRegistryReducer
                        .isGetSchemaRegistryDetailsPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    return (
        <EditSchemaRegistryHeaderComponent
            isRefreshPageContentPending={isGetSchemaRegistryDetailsPending}
            refreshPageContent={refreshPageContent}
        />
    );
};

export default EditSchemaRegistryHeader;
