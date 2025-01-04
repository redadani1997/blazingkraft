import { Anchor } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IClusterBrokersDetails } from 'scenes/cluster/redux';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';

interface ClusterDashboardBrokersComponentProps {
    clusterBrokersDetails: IClusterBrokersDetails[];
    isGetClusterBrokersDetailsPending: boolean;
}
function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'id',
            label: 'Id',
            filterable: false,
            sortable: true,
            minWidth: '5rem',
            width: '10%',
        },
        {
            id: 'host',
            label: 'Host',
            filterable: false,
            sortable: true,
            minWidth: '13rem',
            width: '45%',
        },
        {
            id: 'rack',
            label: 'Rack',
            filterable: false,
            sortable: true,
            minWidth: '5rem',
            width: '15%',
        },
        {
            id: 'totalBytes',
            label: 'Total Bytes',
            filterable: false,
            sortable: true,
            minWidth: '5rem',
            width: '10%',
        },
        {
            id: 'usableBytes',
            label: 'Usable Bytes',
            filterable: false,
            sortable: true,
            minWidth: '5rem',
            width: '10%',
        },
        {
            id: 'totalReplicasSize',
            label: 'Replicas Size',
            filterable: false,
            sortable: true,
            minWidth: '8rem',
            width: '10%',
        },
        {
            id: 'totalOffsetLag',
            label: 'Offsets Lag',
            filterable: false,
            sortable: true,
            minWidth: '6rem',
            width: '10%',
        },
    ];
}

function getData(
    clusterBrokersDetails: IClusterBrokersDetails[],
    clusterCode,
): CommonTableData[] {
    return clusterBrokersDetails.map(broker => {
        return {
            id: {
                value: broker.node?.id,
                displayedValue: (
                    <div className="flex justify-between items-center w-full">
                        <Anchor
                            component={Link}
                            to={`/clusters/${clusterCode}/brokers/${broker.node?.id}/configuration`}
                        >
                            {broker.node?.id}
                        </Anchor>
                    </div>
                ),
            },
            host: {
                value: broker.node?.host,
                displayedValue: `${broker.node?.host}:${broker.node?.port}`,
            },
            rack: {
                value: broker.node?.rack,
                displayedValue: broker.node?.rack ?? 'N/A',
            },
            totalBytes: {
                value: broker.totalBytes,
                displayedValue: CommonValidationUtils.isTruthy(
                    broker.totalBytes,
                )
                    ? CommonUtils.beautifyBytes(broker.totalBytes)
                    : 'N/A',
            },
            usableBytes: {
                value: broker.usableBytes,
                displayedValue: CommonValidationUtils.isTruthy(
                    broker.usableBytes,
                )
                    ? CommonUtils.beautifyBytes(broker.usableBytes)
                    : 'N/A',
            },
            totalReplicasSize: {
                value: broker.totalReplicasSize,
                displayedValue: CommonValidationUtils.isTruthy(
                    broker.totalReplicasSize,
                )
                    ? CommonUtils.beautifyBytes(broker.totalReplicasSize)
                    : 'N/A',
            },
            totalOffsetLag: {
                value: broker.totalOffsetLag,
                displayedValue: broker.totalOffsetLag,
            },
        };
    });
}

const ClusterDashboardBrokersComponent = ({
    clusterBrokersDetails,
    isGetClusterBrokersDetailsPending,
}: ClusterDashboardBrokersComponentProps) => {
    const { clusterCode } = useParams();
    const memoizedData = useMemo(() => {
        return getData(clusterBrokersDetails, clusterCode);
    }, [clusterBrokersDetails, clusterCode]);
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={clusterBrokersDetails.length}
            perPage={5}
            isLoading={isGetClusterBrokersDetailsPending}
            paperClassName="h-5/6 w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default ClusterDashboardBrokersComponent;
