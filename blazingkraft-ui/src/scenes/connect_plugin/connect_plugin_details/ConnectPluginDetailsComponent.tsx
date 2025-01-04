import CommonBody from 'scenes/common/body/CommonBody';
import ConnectPluginDetailsBody from './body/ConnectPluginDetailsBody';
import ConnectPluginDetailsHeader from './header/ConnectPluginDetailsHeader';

interface ConnectPluginDetailsComponentProps {
    refreshPageContent: () => void;
}

function ConnectPluginDetailsComponent({
    refreshPageContent,
}: ConnectPluginDetailsComponentProps) {
    return (
        <>
            <ConnectPluginDetailsHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <ConnectPluginDetailsBody />
            </CommonBody>
        </>
    );
}

export default ConnectPluginDetailsComponent;
