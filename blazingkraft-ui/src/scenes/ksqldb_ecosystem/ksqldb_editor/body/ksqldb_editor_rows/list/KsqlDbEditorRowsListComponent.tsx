import { ActionIcon, Skeleton, Text, Tooltip } from '@mantine/core';
import { TbEraser } from 'react-icons/tb';
import CommonCode from 'scenes/common/code/CommonCode';
import CommonScrollArea from 'scenes/common/scroll_area/CommonScrollArea';
import { IKsqlDbRow } from 'scenes/ksqldb_ecosystem/redux';
import KsqlDbEditorRowsItem from './KsqlDbEditorRowsItem';

interface KsqlDbEditorRowsListComponentProps {
    setSelectedRowId: (index: number) => void;
    setSelectedRow: (row: IKsqlDbRow) => void;
    selectedRowId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
    setRows: (rows: IKsqlDbRow[]) => void;
    rows: IKsqlDbRow[];
    isTransitionning: boolean;
    isConsuming: boolean;
}

function KsqlDbEditorRowsListComponent({
    setSelectedRow,
    setSelectedRowId,
    selectedRowId,
    setIsPreviewModalOpen,
    rows,
    setRows,
    isTransitionning,
    isConsuming,
}: KsqlDbEditorRowsListComponentProps) {
    return (
        <div className="flex flex-col w-full h-full">
            <div
                className="w-full flex items-center relative"
                style={{
                    minHeight: '2.7rem',
                }}
            >
                <div className="w-1/4 overflow-hidden">
                    <CommonCode className="text-sm common-elipsis">
                        Columns
                    </CommonCode>
                </div>
                <div className="w-3/4 overflow-hidden">
                    <CommonCode className="text-sm common-elipsis">
                        Preview
                    </CommonCode>
                </div>

                <div className="absolute flex justify-end w-full">
                    <Tooltip label={`Clear (${rows.length})`}>
                        <ActionIcon
                            onClick={() => {
                                if (rows.length === 0) {
                                    return;
                                }
                                setSelectedRow(null);
                                setSelectedRowId(null);
                                setRows([]);
                                setIsPreviewModalOpen(false);
                            }}
                        >
                            <TbEraser size="1.4rem" />
                        </ActionIcon>
                    </Tooltip>
                </div>
            </div>
            {(isTransitionning || isConsuming) && rows.length === 0 ? (
                <>
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                    <Skeleton height="2.5rem" mt={6} radius="sm" />
                </>
            ) : rows.length > 0 ? (
                <CommonScrollArea className="h-full w-full">
                    {rows.map((row: IKsqlDbRow) => {
                        return (
                            <KsqlDbEditorRowsItem
                                key={row.id}
                                row={row}
                                setSelectedRow={setSelectedRow}
                                setSelectedRowId={setSelectedRowId}
                                selectedRowId={selectedRowId}
                                setIsPreviewModalOpen={setIsPreviewModalOpen}
                            />
                        );
                    })}
                </CommonScrollArea>
            ) : (
                <Text className="text-gray-500 italic pl-4" size="sm">
                    No available data
                </Text>
            )}
        </div>
    );
}

export default KsqlDbEditorRowsListComponent;
