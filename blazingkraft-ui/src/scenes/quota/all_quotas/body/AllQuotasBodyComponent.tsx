import { ActionIcon, Tooltip } from '@mantine/core';
import { QuotaEntry } from 'common/types/quota';
import { useMemo } from 'react';
import { TbPencil } from 'react-icons/tb';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface AllQuotasBodyComponentProps {
    setIsAlterQuotasModalOpen: (isOpen: boolean) => void;
    setQuotaEntryToAlter: (quota: any) => void;
    isDescribeQuotasPending: boolean;
    quotas: QuotaEntry[];
    isAuthorizedAlterQuota: boolean;
}

function getColumns(isAuthorizedAlterQuota): CommonTableColumn[] {
    const columns: CommonTableColumn[] = [
        {
            id: 'entities',
            label: 'Entities',
            filterable: true,
            sortable: true,
            minWidth: '20rem',
            width: '45%',
        },
        {
            id: 'quotas',
            label: 'Quotas',
            filterable: true,
            sortable: true,
            minWidth: '20rem',
            width: '45%',
        },
    ];
    if (isAuthorizedAlterQuota) {
        columns.push({
            id: 'actions',
            label: 'Actions',
            filterable: false,
            sortable: false,
            minWidth: '5rem',
            width: '10%',
        });
    }

    return columns;
}

function getData(
    quotas: QuotaEntry[],
    setIsAlterQuotasModalOpen: (isOpen: boolean) => void,
    setQuotaEntryToAlter: (quota: any) => void,
    isAuthorizedAlterQuota,
): CommonTableData[] {
    return quotas.map(quotaEntry => {
        const { quotas, entities } = quotaEntry;
        const valueEntities = entities.map(entity => {
            const { entityType, entityName } = entity;
            return `${entityType}: ${entityName}`;
        });
        const valueQuotas = quotas.map(quota => {
            const { key, value } = quota;
            return `${key}: ${value}`;
        });
        const displayedEntities = entities.map(entity => {
            const { entityType, entityName } = entity;
            return (
                <span
                    key={`${entityName} ${entityType}`}
                    className="pr-3 underline"
                >
                    <span className="italic font-semibold">{entityType}: </span>
                    {entityName}
                </span>
            );
        });
        const displayedQuotas = quotas.map(quota => {
            const { key, value } = quota;
            return (
                <span key={`${key} ${value}`} className="pr-3 underline">
                    <span className="italic font-semibold">{key}: </span>
                    {value}
                </span>
            );
        });
        const data: CommonTableData = {
            entities: {
                value: valueEntities,
                displayedValue: (
                    <span className="inline-block break-all">
                        {displayedEntities}
                    </span>
                ),
            },
            quotas: {
                value: valueQuotas,
                displayedValue: (
                    <span className="inline-block break-all">
                        {displayedQuotas}
                    </span>
                ),
            },
        };
        if (isAuthorizedAlterQuota) {
            data['actions'] = {
                value: '',
                displayedValue: (
                    <div className="flex justify-around w-full">
                        <Tooltip label="Alter">
                            <ActionIcon
                                color="blue"
                                onClick={() => {
                                    setQuotaEntryToAlter(quotaEntry);
                                    setIsAlterQuotasModalOpen(true);
                                }}
                            >
                                <TbPencil size="1.4rem" />
                            </ActionIcon>
                        </Tooltip>
                    </div>
                ),
            };
        }
        return data;
    });
}

const AllQuotasBodyComponent = ({
    isDescribeQuotasPending,
    quotas,
    setIsAlterQuotasModalOpen,
    setQuotaEntryToAlter,
    isAuthorizedAlterQuota,
}: AllQuotasBodyComponentProps) => {
    const memoizedData = useMemo(
        () =>
            getData(
                quotas,
                setIsAlterQuotasModalOpen,
                setQuotaEntryToAlter,
                isAuthorizedAlterQuota,
            ),
        [quotas, isAuthorizedAlterQuota],
    );

    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns(isAuthorizedAlterQuota)}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={quotas.length}
            perPage={25}
            isLoading={isDescribeQuotasPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllQuotasBodyComponent;
