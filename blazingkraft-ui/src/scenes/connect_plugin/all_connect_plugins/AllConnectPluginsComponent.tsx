import CommonBody from 'scenes/common/body/CommonBody';
import AllConnectPluginsBody from './body/AllConnectPluginsBody';
import AllConnectPluginsHeader from './header/AllConnectPluginsHeader';

interface AllConnectPluginsComponentProps {
    refreshPageContent: () => void;
}

function AllConnectPluginsComponent({
    refreshPageContent,
}: AllConnectPluginsComponentProps) {
    return (
        <>
            <AllConnectPluginsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllConnectPluginsBody />
            </CommonBody>
        </>
    );
}

export default AllConnectPluginsComponent;
