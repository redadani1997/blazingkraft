import { Grid } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useRef, useState, useTransition } from 'react';
import { IKsqlDbRow } from 'scenes/ksqldb_ecosystem/redux';
import KsqlDbEditorFilter from './ksqldb_editor_filter/KsqlDbEditorFilter';
import KsqlDbEditorRows from './ksqldb_editor_rows/KsqlDbEditorRows';
import KsqlDbEditorSql from './ksqldb_editor_sql/KsqlDbEditorSql';

interface KsqlDbEditorBodyComponentProps {
    ksqldbEditorResultRows: IKsqlDbRow[];
    isKsqlDbEditorExecuteQueryPending: boolean;
    clearRows: () => void;
}

export type KsqlDbEditorType =
    | 'EXECUTE_QUERY'
    | 'EXECUTE_STATEMENT'
    | 'STREAM_QUERY';

const KsqlDbEditorBodyComponent = ({
    ksqldbEditorResultRows,
    isKsqlDbEditorExecuteQueryPending,
    clearRows,
}: KsqlDbEditorBodyComponentProps) => {
    const [isTransitionning, startTransition] = useTransition();
    const rowsInnerState = useRef<IKsqlDbRow[]>([]);
    const [sql, setSql] = useState('SELECT * FROM blazingstream LIMIT 100;');
    const [properties, setProperties] = useState(
        CommonUtils.beautifyJson({
            'auto.offset.reset': 'earliest',
        }),
    );
    const [editorType, setEditorType] =
        useState<KsqlDbEditorType>('EXECUTE_QUERY');
    const [rows, setRows] = useState<IKsqlDbRow[]>([]);

    const [isConsuming, setIsConsuming] = useState(false);

    const transitionnedSetRows = (rows: IKsqlDbRow[]) => {
        rowsInnerState.current = rows;
        startTransition(() => {
            setRows(rows);
        });
    };

    const synchronousSetRows = (rows: IKsqlDbRow[]) => {
        rowsInnerState.current = rows;
        setRows(rows);
    };

    useEffect(() => {
        if (editorType === 'EXECUTE_QUERY') {
            setIsConsuming(isKsqlDbEditorExecuteQueryPending);
            setRows(ksqldbEditorResultRows);
        }
    }, [ksqldbEditorResultRows, isKsqlDbEditorExecuteQueryPending]);

    useEffect(() => {
        return () => {
            clearRows();
        };
    }, []);

    return (
        <div className="h-full w-full flex flex-col">
            <div className="h-auto">
                <KsqlDbEditorFilter
                    sql={sql}
                    properties={properties}
                    editorType={editorType}
                    setEditorType={setEditorType}
                    synchronousSetRows={synchronousSetRows}
                    transitionnedSetRows={transitionnedSetRows}
                    rowsInnerState={rowsInnerState}
                    setIsConsuming={setIsConsuming}
                    isConsuming={isConsuming}
                />
            </div>
            <Grid
                className="pt-1 flex flex-1"
                style={{
                    minHeight: '30rem',
                }}
            >
                <Grid.Col span={12} md={7}>
                    <KsqlDbEditorSql
                        properties={properties}
                        setProperties={setProperties}
                        sql={sql}
                        setSql={setSql}
                    />
                </Grid.Col>
                <Grid.Col
                    span={12}
                    md={5}
                    style={{
                        minHeight: '23rem',
                    }}
                >
                    <KsqlDbEditorRows
                        rows={rows}
                        setRows={transitionnedSetRows}
                        isTransitionning={isTransitionning}
                        isConsuming={isConsuming}
                    />
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default KsqlDbEditorBodyComponent;
