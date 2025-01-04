import { Divider, ThemeIcon } from '@mantine/core';
import { IconType } from 'react-icons';
import { BsCodeSlash } from 'react-icons/bs';
import { IoMdReturnLeft } from 'react-icons/io';
import { MdOutlineDifference } from 'react-icons/md';
import { SiOpenapiinitiative } from 'react-icons/si';
import { TbArrowsExchange2, TbSchema } from 'react-icons/tb';
import { ActiveLink, ActivePage } from '../..';
import CommonNavbarLink from '../../common/CommonNavbarLink';

interface NavbarSecondaryPagePlaygroundItemsComponentProps {
    activeLink: ActiveLink;
    setActivePage: (activePage: ActivePage) => void;

    isAuthorizedContentDiffFeature: boolean;
    isAuthorizedContentValidationFeature: boolean;
    isAuthorizedConversionsFeature: boolean;
    isAuthorizedOpenAPIContentFeature: boolean;
    isAuthorizedOpenAPIDefinitionFeature: boolean;
    isAuthorizedSchemasContentFeature: boolean;
    isAuthorizedSchemasDefinitionFeature: boolean;
}

function renderIcon(Icon: IconType) {
    return (
        <ThemeIcon variant="light" size={30}>
            <Icon size={20} />
        </ThemeIcon>
    );
}

function NavbarSecondaryPagePlaygroundItemsComponent({
    activeLink,
    setActivePage,
    isAuthorizedContentDiffFeature,
    isAuthorizedContentValidationFeature,
    isAuthorizedConversionsFeature,
    isAuthorizedOpenAPIContentFeature,
    isAuthorizedOpenAPIDefinitionFeature,
    isAuthorizedSchemasContentFeature,
    isAuthorizedSchemasDefinitionFeature,
}: NavbarSecondaryPagePlaygroundItemsComponentProps) {
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

            {isAuthorizedSchemasContentFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="PLAYGROUND"
                    type="SCHEMAS_CONTENT"
                    name="Schemas Content"
                    icon={renderIcon(TbSchema)}
                    link="/playground/schemas/content"
                />
            )}

            {isAuthorizedSchemasDefinitionFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="PLAYGROUND"
                    type="SCHEMAS_DEFINITION"
                    name="Schemas Definition"
                    icon={renderIcon(TbSchema)}
                    link="/playground/schemas/definition"
                />
            )}

            {isAuthorizedOpenAPIContentFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="PLAYGROUND"
                    type="OPENAPI_CONTENT"
                    name="OpenAPI Content"
                    icon={renderIcon(SiOpenapiinitiative)}
                    link="/playground/openapi/content"
                />
            )}

            {isAuthorizedOpenAPIDefinitionFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="PLAYGROUND"
                    type="OPENAPI_DEFINITION"
                    name="OpenAPI Definition"
                    icon={renderIcon(SiOpenapiinitiative)}
                    link="/playground/openapi/definition"
                />
            )}

            {isAuthorizedContentValidationFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="PLAYGROUND"
                    type="CONTENT_VALIDATION"
                    name="Content Validation"
                    icon={renderIcon(BsCodeSlash)}
                    link="/playground/content/validation"
                />
            )}

            {isAuthorizedContentDiffFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="PLAYGROUND"
                    type="CONTENT_DIFF"
                    name="Content Diff"
                    icon={renderIcon(MdOutlineDifference)}
                    link="/playground/content/diff"
                />
            )}

            {isAuthorizedConversionsFeature && (
                <CommonNavbarLink
                    activeLink={activeLink}
                    id="PLAYGROUND"
                    type="CONVERSIONS"
                    name="Conversions"
                    icon={renderIcon(TbArrowsExchange2)}
                    link="/playground/conversions"
                />
            )}
        </div>
    );
}

export default NavbarSecondaryPagePlaygroundItemsComponent;
