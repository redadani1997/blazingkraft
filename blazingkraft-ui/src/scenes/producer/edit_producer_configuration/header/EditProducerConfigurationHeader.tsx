import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditProducerConfigurationHeaderComponent from './EditProducerConfigurationHeaderComponent';

interface EditProducerConfigurationHeaderProps {
    refreshPageContent: () => void;
}

const EditProducerConfigurationHeader = ({
    refreshPageContent,
}: EditProducerConfigurationHeaderProps) => {
    // Map State To Props
    const { isGetProducerCompleteConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetProducerCompleteConfigurationPending:
                    store.producerReducer
                        .isGetProducerCompleteConfigurationPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    return (
        <EditProducerConfigurationHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={
                isGetProducerCompleteConfigurationPending
            }
        />
    );
};

export default EditProducerConfigurationHeader;
