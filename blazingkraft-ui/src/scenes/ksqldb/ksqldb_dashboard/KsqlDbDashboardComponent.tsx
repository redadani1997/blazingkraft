import CommonBody from 'scenes/common/body/CommonBody';
import KsqlDbDashboardBody from './body/KsqlDbDashboardBody';
import KsqlDbDashboardHeader from './header/KsqlDbDashboardHeader';

interface KsqlDbDashboardComponentProps {
    refreshPageContent: () => void;
    jmxEnabled: boolean;
}

function KsqlDbDashboardComponent({
    refreshPageContent,
    jmxEnabled,
}: KsqlDbDashboardComponentProps) {
    return (
        <>
            <KsqlDbDashboardHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <KsqlDbDashboardBody jmxEnabled={jmxEnabled} />
            </CommonBody>
        </>
    );
}

export default KsqlDbDashboardComponent;
