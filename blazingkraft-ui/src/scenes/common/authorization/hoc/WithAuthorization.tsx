import ForbiddenPage from 'scenes/403/ForbiddenPage';
import { RequiredPermission } from '..';
import useAuthorization from '../hook/useAuthorization';

interface WithAuthorizationProps {
    requiredPermissions: RequiredPermission[];
    children: any;
    fallback?: any;
    renderForbidden?: boolean;
}

function WithAuthorization({
    requiredPermissions,
    children,
    fallback,
    renderForbidden,
}: WithAuthorizationProps) {
    const { isAuthorized } = useAuthorization({ requiredPermissions });

    if (isAuthorized) {
        return children;
    }
    if (fallback) {
        return fallback;
    }
    if (renderForbidden) {
        return <ForbiddenPage />;
    }
    return null;
}

export default WithAuthorization;
