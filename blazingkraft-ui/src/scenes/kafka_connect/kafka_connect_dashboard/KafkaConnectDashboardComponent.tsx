import CommonBody from 'scenes/common/body/CommonBody';
import KafkaConnectDashboardBody from './body/KafkaConnectDashboardBody';
import KafkaConnectDashboardHeader from './header/KafkaConnectDashboardHeader';

interface KafkaConnectDashboardComponentProps {
    refreshPageContent: () => void;
    jmxEnabled: boolean;
}

function KafkaConnectDashboardComponent({
    refreshPageContent,
    jmxEnabled,
}: KafkaConnectDashboardComponentProps) {
    return (
        <>
            <KafkaConnectDashboardHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <KafkaConnectDashboardBody jmxEnabled={jmxEnabled} />
            </CommonBody>
        </>
    );
}

export default KafkaConnectDashboardComponent;
