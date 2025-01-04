import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DeleteOIDCProvider from '../delete_oidc_provider/DeleteOIDCProvider';
import { OIDCProvider } from '../redux';
import AllOIDCProvidersBody from './body/AllOIDCProvidersBody';
import AllOIDCProvidersHeader from './header/AllOIDCProvidersHeader';

interface AllOIDCProvidersComponentProps {
    refreshPageContent: () => void;
}

function AllOIDCProvidersComponent({
    refreshPageContent,
}: AllOIDCProvidersComponentProps) {
    const [isDeleteOIDCProviderModalOpen, setIsDeleteOIDCProviderModalOpen] =
        useState(false);
    const [OIDCProviderToDelete, setOIDCProviderToDelete] =
        useState<OIDCProvider>(null);

    return (
        <>
            <AllOIDCProvidersHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllOIDCProvidersBody
                    setIsDeleteOIDCProviderModalOpen={
                        setIsDeleteOIDCProviderModalOpen
                    }
                    setOIDCProviderToDelete={setOIDCProviderToDelete}
                />
            </CommonBody>
            <DeleteOIDCProvider
                OIDCProviderToDelete={OIDCProviderToDelete}
                setIsModalOpen={setIsDeleteOIDCProviderModalOpen}
                isModalOpen={isDeleteOIDCProviderModalOpen}
                onSuccess={refreshPageContent}
            />
        </>
    );
}

export default AllOIDCProvidersComponent;
