import { Button, Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { TbCirclePlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AllOIDCProvidersHeaderComponentProps {
    refreshPageContent: any;
    isRefreshPageContentPending: boolean;
    OIDCProvidersLength: number;
    isAuthorizedCreateOIDCProvider: boolean;
}

function renderTitle(
    refreshPageContent,
    isRefreshPageContentPending,
    OIDCProvidersLength,
    isAuthorizedCreateOIDCProvider,
) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="OpenID Connect Providers"
                refreshPageContent={refreshPageContent}
                isRefreshPageContentPending={isRefreshPageContentPending}
                subLabel={
                    <Tooltip label="Number of OIDC Prodivers">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    OIDCProvidersLength,
                                )}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
            {isAuthorizedCreateOIDCProvider && (
                <Button
                    component={Link}
                    to="/management/oidc_providers/create"
                    leftIcon={<TbCirclePlus size={22} />}
                >
                    Create OIDC Provider
                </Button>
            )}
        </div>
    );
}

function AllOIDCProvidersHeaderComponent({
    refreshPageContent,
    isRefreshPageContentPending,
    OIDCProvidersLength,
    isAuthorizedCreateOIDCProvider,
}: AllOIDCProvidersHeaderComponentProps) {
    const title = renderTitle(
        refreshPageContent,
        isRefreshPageContentPending,
        OIDCProvidersLength,
        isAuthorizedCreateOIDCProvider,
    );
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Management',
                },
                {
                    highlighted: true,
                    label: 'OIDC Providers',
                },
            ]}
            title={title}
        />
    );
}

export default AllOIDCProvidersHeaderComponent;
