import { useEffect } from 'react';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';

interface BlazingKraftLoginCallbackComponentProps {
    blazingkraftRefreshToken: () => Promise<any>;
    isRefreshTokenPending: boolean;
}

function BlazingKraftLoginCallbackComponent({
    blazingkraftRefreshToken,
    isRefreshTokenPending,
}: BlazingKraftLoginCallbackComponentProps) {
    useEffect(() => {
        blazingkraftRefreshToken();
    }, []);
    return <LoadingSpinner isLoading={isRefreshTokenPending} />;
}

export default BlazingKraftLoginCallbackComponent;
