import CommonBody from 'scenes/common/body/CommonBody';
import EditOIDCProviderBody from './body/EditOIDCProviderBody';
import EditOIDCProviderHeader from './header/EditOIDCProviderHeader';

function EditOIDCProviderComponent() {
    return (
        <>
            <EditOIDCProviderHeader />
            <CommonBody>
                <EditOIDCProviderBody />
            </CommonBody>
        </>
    );
}

export default EditOIDCProviderComponent;
