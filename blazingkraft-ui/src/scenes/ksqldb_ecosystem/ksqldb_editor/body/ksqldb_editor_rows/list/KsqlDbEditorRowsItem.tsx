import { Card, Text, useMantineColorScheme } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import React, { useCallback, useMemo } from 'react';
import CommonTransition from 'scenes/common/transition/CommonTransition';
import { IKsqlDbRow } from 'scenes/ksqldb_ecosystem/redux';

interface KsqlDbEditorRowsItemProps {
    row: IKsqlDbRow;
    setSelectedRowId: (index: number) => void;
    setSelectedRow: (row: IKsqlDbRow) => void;
    selectedRowId: number;
    setIsPreviewModalOpen: (isOpen: boolean) => void;
}

function KsqlDbEditorRowsItem({
    row,
    setSelectedRow,
    setSelectedRowId,
    selectedRowId,
    setIsPreviewModalOpen,
}: KsqlDbEditorRowsItemProps) {
    const memoizedRow = useMemo(() => row, [row]);
    const isSelected = selectedRowId === row.id;
    const memoizedSetSelectedRow = useCallback(row => setSelectedRow(row), []);
    const memoizedSetSelectedRowIndex = useCallback(
        index => setSelectedRowId(index),
        [setSelectedRowId],
    );
    const memoizedSetIsPreviewModalOpen = useCallback(
        bool => setIsPreviewModalOpen(bool),
        [setIsPreviewModalOpen],
    );
    return (
        <KsqlDbEditorRowsItemInnerMemo
            row={memoizedRow}
            setSelectedRow={memoizedSetSelectedRow}
            setSelectedRowId={memoizedSetSelectedRowIndex}
            isSelected={isSelected}
            setIsPreviewModalOpen={memoizedSetIsPreviewModalOpen}
        />
    );
}

function KsqlDbEditorRowsItemInner({
    row,
    setSelectedRow,
    setSelectedRowId,
    isSelected,
    setIsPreviewModalOpen,
}: {
    row: IKsqlDbRow;
    [x: string]: any;
}) {
    const { colorScheme } = useMantineColorScheme();
    const textColor = colorScheme === 'dark' ? 'darkcyan' : 'lightgreen';

    const stringifiedRow = CommonUtils.beautifyJson(row.data);
    const columns = Object.keys(row.data).length;

    return (
        <CommonTransition key={row.id}>
            <Card
                className="cursor-pointer py-3 my-1"
                onClick={() => {
                    setSelectedRow(row);
                    setSelectedRowId(row.id);
                    setIsPreviewModalOpen(true);
                }}
                style={{
                    background: !isSelected ? undefined : textColor,
                }}
            >
                <div
                    className="grid gap-2 w-full items-center"
                    style={{
                        gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
                    }}
                >
                    <span className="grid-col-span-1">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis w-full"
                        >
                            {columns}
                        </Text>
                    </span>
                    <span className="grid-col-span-3">
                        <Text
                            size="sm"
                            className="italic font-semibold common-elipsis w-full"
                        >
                            {stringifiedRow}
                        </Text>
                    </span>
                </div>
            </Card>
        </CommonTransition>
    );
}
const KsqlDbEditorRowsItemInnerMemo = React.memo(KsqlDbEditorRowsItemInner);

export default KsqlDbEditorRowsItem;
