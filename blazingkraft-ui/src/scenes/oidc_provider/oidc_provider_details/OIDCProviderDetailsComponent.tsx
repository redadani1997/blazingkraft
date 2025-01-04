import CommonBody from 'scenes/common/body/CommonBody';
import OIDCProviderDetailsBody from './body/OIDCProviderDetailsBody';
import OIDCProviderDetailsHeader from './header/OIDCProviderDetailsHeader';

interface OIDCProviderDetailsComponentProps {
    refreshPageContent: () => void;
}

function OIDCProviderDetailsComponent({
    refreshPageContent,
}: OIDCProviderDetailsComponentProps) {
    return (
        <>
            <OIDCProviderDetailsHeader
                refreshPageContent={refreshPageContent}
            />
            <CommonBody>
                <OIDCProviderDetailsBody />
            </CommonBody>
        </>
    );
}

export default OIDCProviderDetailsComponent;
