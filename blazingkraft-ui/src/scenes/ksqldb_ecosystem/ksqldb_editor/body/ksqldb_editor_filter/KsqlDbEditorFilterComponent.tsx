import { Grid } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import { MutableRefObject } from 'react';
import { TbPlayerStop } from 'react-icons/tb';
import { useParams } from 'react-router';
import CommonButton from 'scenes/common/button/CommonButton';
import CommonSelect from 'scenes/common/select/CommonSelect';
import { IKsqlDbRow } from 'scenes/ksqldb_ecosystem/redux';
import { KsqlDbEditorType } from '../KsqlDbEditorBodyComponent';
import useKsqlDbStreamQuery, {
    KsqlDbStreamQueryRequestBody,
} from '../hooks/useKsqlDbStreamQuery';

interface KsqlDbEditorFilterComponentProps {
    executeQuery: (sql: string, properties: string) => void;
    executeStatement: (sql: string, properties: string) => void;
    isKsqlDbEditorExecuteQueryPending: boolean;
    isAuthorizedExecuteStatement: boolean;
    isAuthorizedStreamQuery: boolean;
    isKsqlDbEditorExecuteStatementPending: boolean;
    sql: string;
    properties: string;
    editorType: KsqlDbEditorType;
    setEditorType: (editorType: KsqlDbEditorType) => void;
    clearRows: () => void;
    synchronousSetRows: (rows: IKsqlDbRow[]) => void;
    rowsInnerState: MutableRefObject<IKsqlDbRow[]>;
    transitionnedSetRows: (rows: IKsqlDbRow[]) => void;
    isConsuming: boolean;
    setIsConsuming: (isConsuming: boolean) => void;
}

function getOptions(
    isAuthorizedExecuteStatement: boolean,
    isAuthorizedStreamQuery: boolean,
) {
    const options = [
        {
            label: 'Execute Query',
            value: 'EXECUTE_QUERY',
        },
    ];
    if (isAuthorizedStreamQuery) {
        options.push({
            label: 'Stream Query',
            value: 'STREAM_QUERY',
        });
    }
    if (isAuthorizedExecuteStatement) {
        options.push({
            label: 'Execute Statement',
            value: 'EXECUTE_STATEMENT',
        });
    }
    return options;
}

function KsqlDbEditorFilterComponent({
    executeQuery,
    isKsqlDbEditorExecuteQueryPending,
    executeStatement,
    isAuthorizedExecuteStatement,
    isAuthorizedStreamQuery,
    isKsqlDbEditorExecuteStatementPending,
    properties,
    sql,
    editorType,
    setEditorType,
    clearRows,
    rowsInnerState,
    synchronousSetRows,
    isConsuming,
    setIsConsuming,
    transitionnedSetRows,
}: KsqlDbEditorFilterComponentProps) {
    const { ksqlDbCode } = useParams();

    const options = getOptions(
        isAuthorizedExecuteStatement,
        isAuthorizedStreamQuery,
    );

    const { start, stop } = useKsqlDbStreamQuery(
        synchronousSetRows,
        transitionnedSetRows,
        rowsInnerState,
        setIsConsuming,
    );

    function doRun() {
        clearRows();
        if (editorType === 'EXECUTE_QUERY') {
            executeQuery(sql, properties);
        } else if (editorType === 'EXECUTE_STATEMENT') {
            executeStatement(sql, properties);
        } else if (editorType === 'STREAM_QUERY') {
            const requestBody: KsqlDbStreamQueryRequestBody = {
                ksqlDbCode,
                sql,
                properties: CommonUtils.stringToObject(properties),
            };
            start(requestBody);
        }
    }

    function doStop() {
        stop();
    }

    function getButton() {
        if (editorType === 'EXECUTE_QUERY') {
            return (
                <CommonButton
                    onClick={doRun}
                    loading={isKsqlDbEditorExecuteQueryPending}
                >
                    Execute Query
                </CommonButton>
            );
        } else if (editorType === 'EXECUTE_STATEMENT') {
            return (
                <CommonButton
                    onClick={doRun}
                    loading={isKsqlDbEditorExecuteStatementPending}
                >
                    Execute Statement
                </CommonButton>
            );
        } else if (editorType === 'STREAM_QUERY') {
            if (isConsuming) {
                return (
                    <CommonButton
                        leftIcon={<TbPlayerStop size={22} />}
                        onClick={() => {
                            doStop();
                        }}
                        variant="light"
                        loadingWithoutDisabled
                    >
                        Stop Streaming
                    </CommonButton>
                );
            } else {
                return (
                    <CommonButton onClick={doRun}>Stream Query</CommonButton>
                );
            }
        }
    }

    return (
        <Grid className="items-end pb-4">
            <Grid.Col span={12} xs={6} sm={4} md={4} lg={3}>
                <CommonSelect
                    value={editorType}
                    defaultValue={editorType}
                    data={options}
                    placeholder="Select Editor Type"
                    searchable
                    creatable={false}
                    clearable={false}
                    onChange={value => {
                        setEditorType(value);
                    }}
                />
            </Grid.Col>
            <Grid.Col span={12} xs={6} sm={4} md={4} lg={3}>
                {getButton()}
            </Grid.Col>
        </Grid>
    );
}

export default KsqlDbEditorFilterComponent;
