import CommonBody from 'scenes/common/body/CommonBody';
import AllAlertsBody from './body/AllAlertsBody';
import AllAlertsHeader from './header/AllAlertsHeader';

function AllAlertsComponent() {
    return (
        <>
            <AllAlertsHeader />
            <CommonBody>
                <AllAlertsBody />
            </CommonBody>
        </>
    );
}

export default AllAlertsComponent;
