import CommonBody from 'scenes/common/body/CommonBody';
import ServerPermissionsDetailsBody from './body/ServerPermissionsDetailsBody';
import ServerPermissionsDetailsHeader from './header/ServerPermissionsDetailsHeader';

interface ServerPermissionsDetailsComponentProps {
    refreshPageContent: () => void;
}

function ServerPermissionsDetailsComponent({
    refreshPageContent,
}: ServerPermissionsDetailsComponentProps) {
    return (
        <>
            <ServerPermissionsDetailsHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <ServerPermissionsDetailsBody />
            </CommonBody>
        </>
    );
}

export default ServerPermissionsDetailsComponent;
