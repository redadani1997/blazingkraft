import CommonBody from 'scenes/common/body/CommonBody';
import SchemaRegistryDashboardBody from './body/SchemaRegistryDashboardBody';
import SchemaRegistryDashboardHeader from './header/SchemaRegistryDashboardHeader';

interface SchemaRegistryDashboardComponentProps {
    refreshPageContent: () => void;
}

function SchemaRegistryDashboardComponent({
    refreshPageContent,
}: SchemaRegistryDashboardComponentProps) {
    return (
        <>
            <SchemaRegistryDashboardHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <SchemaRegistryDashboardBody />
            </CommonBody>
        </>
    );
}

export default SchemaRegistryDashboardComponent;
