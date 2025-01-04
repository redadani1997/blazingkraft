import CommonBody from 'scenes/common/body/CommonBody';
import AllKsqlDbConnectorsBody from './body/AllKsqlDbConnectorsBody';
import AllKsqlDbConnectorsHeader from './header/AllKsqlDbConnectorsHeader';

interface AllKsqlDbConnectorsComponentProps {
    refreshPageContent: () => void;
}

function AllKsqlDbConnectorsComponent({
    refreshPageContent,
}: AllKsqlDbConnectorsComponentProps) {
    return (
        <>
            <AllKsqlDbConnectorsHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <AllKsqlDbConnectorsBody
                    refreshPageContent={refreshPageContent}
                />
            </CommonBody>
        </>
    );
}

export default AllKsqlDbConnectorsComponent;
