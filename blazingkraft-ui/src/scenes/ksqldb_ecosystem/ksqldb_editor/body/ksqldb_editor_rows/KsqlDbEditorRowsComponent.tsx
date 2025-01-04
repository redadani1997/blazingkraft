import { Grid } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IKsqlDbRow } from 'scenes/ksqldb_ecosystem/redux';
import KsqlDbEditorRowsList from './list/KsqlDbEditorRowsList';
import KsqlDbEditorRowPreview from './preview/KsqlDbEditorRowPreview';

interface KsqlDbEditorRowsComponentProps {
    setRows: (rows: IKsqlDbRow[]) => void;
    rows: IKsqlDbRow[];
    isTransitionning: boolean;
    isConsuming: boolean;
}

function KsqlDbEditorRowsComponent({
    rows,
    setRows,
    isTransitionning,
    isConsuming,
}: KsqlDbEditorRowsComponentProps) {
    const [selectedRow, setSelectedRow] = useState<IKsqlDbRow | null>(null);
    const [selectedRowId, setSelectedRowId] = useState<number>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

    useEffect(() => {
        if (rows && rows.length === 0) {
            setSelectedRow(null);
            setSelectedRowId(null);
        } else if (
            selectedRowId === null &&
            selectedRow === null &&
            rows &&
            rows.length > 0
        ) {
            setSelectedRow(rows[0]);
            setSelectedRowId(rows[0].id);
        }
    }, [rows]);

    return (
        <Grid
            className="flex h-full"
            style={{
                minHeight: '30rem',
            }}
        >
            <Grid.Col span={12}>
                <KsqlDbEditorRowsList
                    setSelectedRow={setSelectedRow}
                    selectedRowId={selectedRowId}
                    setSelectedRowId={setSelectedRowId}
                    setIsPreviewModalOpen={setIsPreviewModalOpen}
                    rows={rows}
                    setRows={setRows}
                    isTransitionning={isTransitionning}
                    isConsuming={isConsuming}
                />
            </Grid.Col>
            <KsqlDbEditorRowPreview
                selectedRow={selectedRow}
                isPreviewModalOpen={isPreviewModalOpen}
                setIsPreviewModalOpen={setIsPreviewModalOpen}
            />
        </Grid>
    );
}

export default KsqlDbEditorRowsComponent;
