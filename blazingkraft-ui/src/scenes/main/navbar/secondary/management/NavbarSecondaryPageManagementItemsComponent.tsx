import { Divider, ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { AiFillAlert, AiOutlineAudit } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { FaMask } from 'react-icons/fa';
import { IoMdReturnLeft } from 'react-icons/io';
import { MdOutlineGroups } from 'react-icons/md';
import { SiOpenid } from 'react-icons/si';
import { TbShieldCheckered } from 'react-icons/tb';
import { ActiveLink, ActivePage } from '../..';
import CommonNavbarLink from '../../common/CommonNavbarLink';

interface NavbarSecondaryPageManagementItemsComponentProps {
    activeLink: ActiveLink;
    setActivePage: (activePage: ActivePage) => void;

    isAuthorizedDataMaskingFeature: boolean;
    isAuthorizedGroupFeature: boolean;
    isAuthorizedOIDCProviderFeature: boolean;
    isAuthorizedServerPermissionsFeature: boolean;
    isAuthorizedUserFeature: boolean;
    isAuthorizedAuditFeature: boolean;
    isAuthorizedAlertFeature: boolean;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarSecondaryPageManagementItemsComponent({
    activeLink,
    setActivePage,
    isAuthorizedDataMaskingFeature,
    isAuthorizedGroupFeature,
    isAuthorizedOIDCProviderFeature,
    isAuthorizedServerPermissionsFeature,
    isAuthorizedUserFeature,
    isAuthorizedAuditFeature,
    isAuthorizedAlertFeature,
}: NavbarSecondaryPageManagementItemsComponentProps) {
    return (
        <div>
            <CommonNavbarLink
                activeLink={activeLink}
                id={null}
                name="Back"
                icon={renderIcon(IoMdReturnLeft)}
                onClick={() => {
                    setActivePage('PRIMARY');
                }}
            />

            <Divider />

            {isAuthorizedUserFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="MANAGEMENT"
                    type="USERS"
                    name="Users"
                    icon={renderIcon(BiUserCircle)}
                    link="/management/users"
                />
            )}
            {isAuthorizedGroupFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="MANAGEMENT"
                    type="GROUPS"
                    name="Groups"
                    icon={renderIcon(MdOutlineGroups)}
                    link="/management/groups"
                />
            )}

            {isAuthorizedOIDCProviderFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="MANAGEMENT"
                    type="OIDC_PROVIDERS"
                    name="OIDC Providers"
                    icon={renderIcon(SiOpenid)}
                    link="/management/oidc_providers"
                />
            )}

            {isAuthorizedServerPermissionsFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="MANAGEMENT"
                    type="SERVER_PERMISSIONS"
                    name="Server Permissions"
                    icon={renderIcon(TbShieldCheckered)}
                    link="/management/server_permissions"
                />
            )}

            {isAuthorizedDataMaskingFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="MANAGEMENT"
                    type="DATA_MASKING"
                    name="Data Masking"
                    icon={renderIcon(FaMask)}
                    link="/management/data_masking"
                />
            )}

            {isAuthorizedAuditFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="MANAGEMENT"
                    type="AUDIT"
                    name="Audit"
                    icon={renderIcon(AiOutlineAudit)}
                    link="/management/audit"
                />
            )}

            {isAuthorizedAlertFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="MANAGEMENT"
                    type="ALERTS"
                    name="Alerts"
                    icon={renderIcon(AiFillAlert)}
                    link="/management/alerts"
                />
            )}
        </div>
    );
}

export default NavbarSecondaryPageManagementItemsComponent;
