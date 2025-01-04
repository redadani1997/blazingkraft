import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import EditConsumerConfigurationHeaderComponent from './EditConsumerConfigurationHeaderComponent';

interface EditConsumerConfigurationHeaderProps {
    refreshPageContent: () => void;
}

const EditConsumerConfigurationHeader = ({
    refreshPageContent,
}: EditConsumerConfigurationHeaderProps) => {
    // Map State To Props
    const { isGetConsumerCompleteConfigurationPending } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetConsumerCompleteConfigurationPending:
                    store.consumerReducer
                        .isGetConsumerCompleteConfigurationPending,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    return (
        <EditConsumerConfigurationHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={
                isGetConsumerCompleteConfigurationPending
            }
        />
    );
};

export default EditConsumerConfigurationHeader;
