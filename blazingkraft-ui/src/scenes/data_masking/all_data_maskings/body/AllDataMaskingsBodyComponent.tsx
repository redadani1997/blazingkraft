import { ActionIcon, Tooltip } from '@mantine/core';
import { DataMaskingUtils } from 'common/utils/DataMaskingUtils';
import { useMemo } from 'react';
import { TbPencil, TbTrash } from 'react-icons/tb';
import { CommonTableColumn, CommonTableData } from 'scenes/common/table';
import CommonClientTable from 'scenes/common/table/client/CommonClientTable';
import { IDataMasking } from 'scenes/data_masking/redux';

interface AllDataMaskingsBodyComponentProps {
    dataMaskings?: IDataMasking[];
    isGetAllDataMaskingsPending: boolean;
    isAuthorizedDeleteDataMasking: boolean;
    isAuthorizedEditDataMasking: boolean;
    setDataMaskingToDelete: (dataMaskingCode: string) => void;
    setIsDeleteDataMaskingModalOpen: (isModalOpen: boolean) => void;
    setDataMaskingToEdit: (dataMasking: IDataMasking) => void;
    setIsEditDataMaskingModalOpen: (isModalOpen: boolean) => void;
}

function getColumns(): CommonTableColumn[] {
    return [
        {
            id: 'name',
            label: 'Name',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '30%',
        },
        {
            id: 'maskingType',
            label: 'Type',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '15%',
        },
        {
            id: 'rule',
            label: 'Rule',
            filterable: true,
            sortable: true,
            minWidth: '8rem',
            width: '15%',
        },
        {
            id: 'result',
            label: 'Result',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
        {
            id: 'topicType',
            label: 'Topic Type',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '10%',
        },
        {
            id: 'topic',
            label: 'Topic',
            filterable: true,
            sortable: true,
            minWidth: '10rem',
            width: '15%',
        },
    ];
}

function getData(
    dataMaskings: IDataMasking[],
    isAuthorizedDeleteDataMasking: boolean,
    isAuthorizedEditDataMasking: boolean,
    setDataMaskingToDelete: (dataMasking: string) => void,
    setIsDeleteDataMaskingModalOpen: (isModalOpen: boolean) => void,
    setDataMaskingToEdit: (dataMasking: IDataMasking) => void,
    setIsEditDataMaskingModalOpen: (isModalOpen: boolean) => void,
): CommonTableData[] {
    return dataMaskings.map(dataMasking => ({
        name: {
            value: dataMasking.name,
            displayedValue: (
                <div className="flex justify-between items-center w-full">
                    {dataMasking.name}
                    {(isAuthorizedEditDataMasking ||
                        isAuthorizedDeleteDataMasking) && (
                        <div className="pl-2 flex">
                            {isAuthorizedEditDataMasking && (
                                <Tooltip label="Edit">
                                    <ActionIcon
                                        color="blue"
                                        onClick={() => {
                                            setDataMaskingToEdit(dataMasking);
                                            setIsEditDataMaskingModalOpen(true);
                                        }}
                                    >
                                        <TbPencil size="1.3rem" />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                            {isAuthorizedDeleteDataMasking && (
                                <Tooltip label="Delete">
                                    <ActionIcon
                                        className="ml-1"
                                        color="red"
                                        onClick={() => {
                                            setDataMaskingToDelete(
                                                dataMasking.code,
                                            );
                                            setIsDeleteDataMaskingModalOpen(
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
        maskingType: {
            value: dataMasking.dataMaskingType,
            displayedValue: DataMaskingUtils.getMaskingTypeLabelByMaskingType(
                dataMasking.dataMaskingType,
            ),
        },
        rule: { value: dataMasking.rule, displayedValue: dataMasking.rule },
        result: {
            value: dataMasking.result,
            displayedValue: DataMaskingUtils.getResultLabelByResult(
                dataMasking.result,
            ),
        },
        topicType: {
            value: dataMasking.topicType,
            displayedValue:
                DataMaskingUtils.getTopicTypeLabelByTopicType(
                    dataMasking.topicType,
                ) || '---unavailable---',
        },
        topic: {
            value: dataMasking.topic,
            displayedValue: dataMasking.topic || '---unavailable---',
        },
    }));
}

const AllDataMaskingsBodyComponent = ({
    dataMaskings,
    isGetAllDataMaskingsPending,
    isAuthorizedDeleteDataMasking,
    isAuthorizedEditDataMasking,
    setDataMaskingToDelete,
    setIsDeleteDataMaskingModalOpen,
    setDataMaskingToEdit,
    setIsEditDataMaskingModalOpen,
}: AllDataMaskingsBodyComponentProps) => {
    const memoizedData = useMemo(() => {
        return getData(
            dataMaskings,
            isAuthorizedDeleteDataMasking,
            isAuthorizedEditDataMasking,
            setDataMaskingToDelete,
            setIsDeleteDataMaskingModalOpen,
            setDataMaskingToEdit,
            setIsEditDataMaskingModalOpen,
        );
    }, [
        dataMaskings,
        isAuthorizedDeleteDataMasking,
        isAuthorizedEditDataMasking,
    ]);
    return (
        <CommonClientTable
            filterType="menu"
            columns={getColumns()}
            data={memoizedData}
            withPaging
            withTopFilter
            totalElements={dataMaskings.length}
            perPage={5}
            isLoading={isGetAllDataMaskingsPending}
            paperClassName="h-full w-full"
            // tableClassName="h-full w-full"
        />
    );
};

export default AllDataMaskingsBodyComponent;
