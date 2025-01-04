import { useDocumentTitle } from '@mantine/hooks';
import AllAlertsComponent from './AllAlertsComponent';

const AllAlerts = () => {
    useDocumentTitle('Blazing KRaft - Alerts');

    return <AllAlertsComponent />;
};

export default AllAlerts;
