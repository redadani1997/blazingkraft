import CommonBody from 'scenes/common/body/CommonBody';
import ClusterDashboardBody from './body/ClusterDashboardBody';
import ClusterDashboardHeader from './header/ClusterDashboardHeader';

interface ClusterDashboardComponentProps {
    refreshPageContent: () => void;
    jmxEnabled: boolean;
}

function ClusterDashboardComponent({
    refreshPageContent,
    jmxEnabled,
}: ClusterDashboardComponentProps) {
    return (
        <>
            <ClusterDashboardHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <ClusterDashboardBody jmxEnabled={jmxEnabled} />
            </CommonBody>
        </>
    );
}

export default ClusterDashboardComponent;
