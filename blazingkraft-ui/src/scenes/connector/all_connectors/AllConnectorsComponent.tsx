import CommonBody from 'scenes/common/body/CommonBody';
import AllConnectorsBody from './body/AllConnectorsBody';
import AllConnectorsHeader from './header/AllConnectorsHeader';

interface AllConnectorsComponentProps {
    refreshPageContent: () => void;
}

function AllConnectorsComponent({
    refreshPageContent,
}: AllConnectorsComponentProps) {
    return (
        <>
            <AllConnectorsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllConnectorsBody />
            </CommonBody>
        </>
    );
}

export default AllConnectorsComponent;
