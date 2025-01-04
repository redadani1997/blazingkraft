import { ActionIcon, Anchor, Text, Tooltip } from '@mantine/core';
import { useMemo } from 'react';
import { TbInfoTriangleFilled, TbPencil, TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { OIDCProvider } from 'scenes/oidc_provider/redux';

interface AllOIDCProvidersBodyComponentProps {
    OIDCProviders?: OIDCProvider[];
    isGetAllOIDCProvidersPending: boolean;
    setIsDeleteOIDCProviderModalOpen: (isOpen: boolean) => void;
    setOIDCProviderToDelete: (provider: OIDCProvider) => void;
    isAuthorizedEditOIDCProvider: boolean;
    isAuthorizedDeleteOIDCProvider: boolean;
}
function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '14rem',
            width: '35%',
        },
        {
            id: 'clientId',
            label: 'Client Id',
            filterable: true,
            sortable: true,
            minWidth: '15rem',
            width: '25%',
        },
        {
            id: 'issuer',
            label: 'Issuer',
            filterable: true,
            sortable: true,
            minWidth: '25rem',
            width: '40%',
        },
    ];
}

function getData(
    OIDCProviders: OIDCProvider[],
    setIsDeleteOIDCProviderModalOpen: (isOpen: boolean) => void,
    setOIDCProviderToDelete: (provider: OIDCProvider) => void,
    isAuthorizedEditOIDCProvider: boolean,
    isAuthorizedDeleteOIDCProvider: boolean,
): CommonTableData[] {
    return OIDCProviders.map(provider => ({
        name: {
            value: provider.name,
            displayedValue: (
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                        <Anchor
                            component={Link}
                            to={`/management/oidc_providers/${provider.code}/details`}
                        >
                            {provider.name}
                        </Anchor>
                        {provider.isSystem && (
                            <Tooltip label="System Provider">
                                <ActionIcon className="ml-1">
                                    <TbInfoTriangleFilled size="1rem" />
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </div>
                    {!provider.isSystem &&
                        (isAuthorizedEditOIDCProvider ||
                            isAuthorizedDeleteOIDCProvider) && (
                            <div className="pl-2 flex">
                                {isAuthorizedEditOIDCProvider && (
                                    <Tooltip label="Edit">
                                        <ActionIcon
                                            color="blue"
                                            component={Link}
                                            to={`/management/oidc_providers/${provider.code}/edit`}
                                        >
                                            <TbPencil size="1.3rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                {isAuthorizedDeleteOIDCProvider && (
                                    <Tooltip label="Delete">
                                        <ActionIcon
                                            className="ml-1"
                                            color="red"
                                            onClick={() => {
                                                setOIDCProviderToDelete(
                                                    provider,
                                                );
                                                setIsDeleteOIDCProviderModalOpen(
                                                    true,
                                                );
                                            }}
                                        >
                                            <TbTrash size="1.3rem" />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </div>
                        )}
                </div>
            ),
        },
        clientId: {
            value: provider.clientId,
            displayedValue: (
                <Text className="break-all">{provider.clientId}</Text>
            ),
        },
        issuer: {
            value: provider.issuer,
            displayedValue: (
                <Text className="break-all">{provider.issuer}</Text>
            ),
        },
    }));
}

const AllOIDCProvidersBodyComponent = ({
    OIDCProviders,
    isGetAllOIDCProvidersPending,
    setIsDeleteOIDCProviderModalOpen,
    setOIDCProviderToDelete,
    isAuthorizedEditOIDCProvider,
    isAuthorizedDeleteOIDCProvider,
}: AllOIDCProvidersBodyComponentProps) => {
    const memoizedData = useMemo(
        () =>
            getData(
                OIDCProviders,
                setIsDeleteOIDCProviderModalOpen,
                setOIDCProviderToDelete,
                isAuthorizedEditOIDCProvider,
                isAuthorizedDeleteOIDCProvider,
            ),
        [
            OIDCProviders,
            setIsDeleteOIDCProviderModalOpen,
            setOIDCProviderToDelete,
            isAuthorizedEditOIDCProvider,
            isAuthorizedDeleteOIDCProvider,
        ],
    );
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={OIDCProviders.length}
            perPage={5}
            isLoading={isGetAllOIDCProvidersPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllOIDCProvidersBodyComponent;
