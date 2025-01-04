import { SpotlightAction } from '@mantine/spotlight';
import { useMemo } from 'react';
import { AiFillAlert, AiOutlineAudit } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { FaMask } from 'react-icons/fa';
import { MdOutlineGroups } from 'react-icons/md';
import { SiOpenid } from 'react-icons/si';
import { TbShieldCheckered } from 'react-icons/tb';
import { useNavigate } from 'react-router';

interface UseSpotlightManagementActionsComponentProps {
    isAuthorizedDataMaskingFeature: boolean;
    isAuthorizedGroupFeature: boolean;
    isAuthorizedOIDCProviderFeature: boolean;
    isAuthorizedServerPermissionsFeature: boolean;
    isAuthorizedUserFeature: boolean;
    isAuthorizedAuditFeature: boolean;
    isAuthorizedAlertFeature: boolean;
}

function UseSpotlightManagementActionsComponent({
    isAuthorizedUserFeature,
    isAuthorizedDataMaskingFeature,
    isAuthorizedGroupFeature,
    isAuthorizedOIDCProviderFeature,
    isAuthorizedServerPermissionsFeature,
    isAuthorizedAuditFeature,
    isAuthorizedAlertFeature,
}: UseSpotlightManagementActionsComponentProps): SpotlightAction[] {
    const navigate = useNavigate();
    const actions: SpotlightAction[] = useMemo(() => {
        const computedActions: SpotlightAction[] = [];
        if (isAuthorizedUserFeature) {
            computedActions.push({
                group: 'Management',
                title: 'Users',
                description: 'Manage Users',
                icon: <BiUserCircle size="2rem" />,
                onTrigger: () => {
                    navigate('/management/users');
                },
            });
        }
        if (isAuthorizedGroupFeature) {
            computedActions.push({
                group: 'Management',
                title: 'Groups',
                description: 'Manage Groups',
                icon: <MdOutlineGroups size="2rem" />,
                onTrigger: () => {
                    navigate('/management/groups');
                },
            });
        }
        if (isAuthorizedOIDCProviderFeature) {
            computedActions.push({
                group: 'Management',
                title: 'OpenID Connect Providers',
                description: 'Manage OpenID Connect Providers',
                icon: <SiOpenid size="2rem" />,
                onTrigger: () => {
                    navigate('/management/oidc_providers');
                },
            });
        }
        if (isAuthorizedServerPermissionsFeature) {
            computedActions.push({
                group: 'Management',
                title: 'Server Permissions',
                description: 'Manage Server Permissions',
                icon: <TbShieldCheckered size="2rem" />,
                onTrigger: () => {
                    navigate('/management/server_permissions');
                },
            });
        }
        if (isAuthorizedDataMaskingFeature) {
            computedActions.push({
                group: 'Management',
                title: 'Data Masking',
                description: 'Manage Data Masking Rules',
                icon: <FaMask size="2rem" />,
                onTrigger: () => {
                    navigate('/management/data_masking');
                },
            });
        }
        if (isAuthorizedAuditFeature) {
            computedActions.push({
                group: 'Management',
                title: 'Audit',
                description: 'Search Audit logs',
                icon: <AiOutlineAudit size="2rem" />,
                onTrigger: () => {
                    navigate('/management/audit');
                },
            });
        }
        if (isAuthorizedAlertFeature) {
            computedActions.push({
                group: 'Management',
                title: 'Alerts',
                description: 'Manage Alerts',
                icon: <AiFillAlert size="2rem" />,
                onTrigger: () => {
                    navigate('/management/alerts');
                },
            });
        }
        return computedActions;
    }, [
        isAuthorizedUserFeature,
        isAuthorizedGroupFeature,
        isAuthorizedOIDCProviderFeature,
        isAuthorizedServerPermissionsFeature,
        isAuthorizedDataMaskingFeature,
        isAuthorizedAuditFeature,
        isAuthorizedAlertFeature,
    ]);

    return actions;
}

export default UseSpotlightManagementActionsComponent;
