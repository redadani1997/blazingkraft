import { useDocumentTitle } from '@mantine/hooks';
import CommonBody from 'scenes/common/body/CommonBody';
import CreateOIDCProviderBody from './body/CreateOIDCProviderBody';
import CreateOIDCProviderHeader from './header/CreateOIDCProviderHeader';

function CreateOIDCProviderComponent() {
    useDocumentTitle('Blazing KRaft - Create OIDC Provider');

    return (
        <>
            <CreateOIDCProviderHeader />
            <CommonBody>
                <CreateOIDCProviderBody />
            </CommonBody>
        </>
    );
}

export default CreateOIDCProviderComponent;
