import { ActionIcon, Loader, Menu, Tooltip } from '@mantine/core';
import { BlazingConsumptionResponse } from 'common/types/consumer';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import { BiExport } from 'react-icons/bi';
import { BsFiletypeCsv, BsFiletypeJson } from 'react-icons/bs';

interface BlazingConsumerRecordsExportComponentProps {
    selectedRecordId: number;
    allRecords: BlazingConsumptionResponse[];
    isExportConsumerRecordsPending: boolean;
    exportConsumerRecords: (
        records: BlazingConsumptionResponse[],
        exportType: 'CSV' | 'JSON',
    ) => void;
}

function iconOrLoader(isLoading: boolean, Icon: IconType) {
    return isLoading ? <Loader size="1rem" /> : <Icon size="1rem" />;
}

function BlazingConsumerRecordsExportComponent({
    allRecords,
    selectedRecordId,
    exportConsumerRecords,
    isExportConsumerRecordsPending,
}: BlazingConsumerRecordsExportComponentProps) {
    const exportSelectedRecord = useCallback(
        (exportType: 'CSV' | 'JSON') => {
            if (
                allRecords.length === 0 ||
                selectedRecordId === null ||
                selectedRecordId === undefined
            ) {
                return;
            }
            const record = allRecords.find(
                record => record.id === selectedRecordId,
            );
            if (!record) {
                return;
            }
            exportConsumerRecords([record], exportType);
        },
        [selectedRecordId, allRecords, exportConsumerRecords],
    );
    const exportAllRecords = useCallback(
        (exportType: 'CSV' | 'JSON') => {
            if (allRecords.length === 0) {
                return;
            }
            exportConsumerRecords(allRecords, exportType);
        },
        [selectedRecordId, allRecords, exportConsumerRecords],
    );

    return (
        <Menu shadow="md" width={280}>
            <Tooltip label="Export">
                <Menu.Target>
                    <ActionIcon>
                        {isExportConsumerRecordsPending ? (
                            <Loader size="1.4rem" />
                        ) : (
                            <BiExport size="1.4rem" />
                        )}
                    </ActionIcon>
                </Menu.Target>
            </Tooltip>

            <Menu.Dropdown>
                <Menu.Label>Export Selected Record</Menu.Label>
                <Menu.Item
                    icon={iconOrLoader(
                        isExportConsumerRecordsPending,
                        BsFiletypeJson,
                    )}
                    disabled={isExportConsumerRecordsPending}
                    onClick={() => exportSelectedRecord('JSON')}
                >
                    Selected Record As JSON
                </Menu.Item>
                <Menu.Item
                    icon={iconOrLoader(
                        isExportConsumerRecordsPending,
                        BsFiletypeCsv,
                    )}
                    disabled={isExportConsumerRecordsPending}
                    onClick={() => exportSelectedRecord('CSV')}
                >
                    Selected Record As CSV
                </Menu.Item>
                <Menu.Label>Export All Records</Menu.Label>
                <Menu.Item
                    color="red"
                    icon={iconOrLoader(
                        isExportConsumerRecordsPending,
                        BsFiletypeJson,
                    )}
                    disabled={isExportConsumerRecordsPending}
                    onClick={() => exportAllRecords('JSON')}
                >
                    {`${
                        allRecords.length > 0
                            ? CommonUtils.beautifyNumber(allRecords.length)
                            : 'All'
                    } Records As JSON`}
                </Menu.Item>
                <Menu.Item
                    color="red"
                    icon={iconOrLoader(
                        isExportConsumerRecordsPending,
                        BsFiletypeCsv,
                    )}
                    disabled={isExportConsumerRecordsPending}
                    onClick={() => exportAllRecords('CSV')}
                >
                    {`${
                        allRecords.length > 0
                            ? CommonUtils.beautifyNumber(allRecords.length)
                            : 'All'
                    } Records As CSV`}
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default BlazingConsumerRecordsExportComponent;
