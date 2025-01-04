import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToLoading,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { CommonUtils } from 'common/utils/CommonUtils';
import CommonWebSocket from 'common/websocket/CommonWebSocket';
import { MutableRefObject, useEffect, useRef } from 'react';
import { IKsqlDbRow } from 'scenes/ksqldb_ecosystem/redux';

export interface KsqlDbStreamQueryRequestBody {
    ksqlDbCode: string;
    sql: string;
    properties: {
        [key: string]: string;
    };
}

function useKsqlDbStreamQuery(
    synchronousSetRows: (rows: IKsqlDbRow[]) => void,
    transitionnedSetRows: (rows: IKsqlDbRow[]) => void,
    rowsInnerState: MutableRefObject<IKsqlDbRow[]>,
    setIsConsuming: (isConsuming: boolean) => void,
) {
    const wsRef = useRef<CommonWebSocket | null>(null);

    function constructWs(): CommonWebSocket | null {
        return new CommonWebSocket({
            topic: '/queue/ksqldb',
            onMessage: message => {
                if (!wsRef.current) {
                    return;
                }
                const { type, payload } = message;
                switch (type) {
                    case 'INFO': {
                        notifyUpdateToLoading({
                            title: 'KsqlDb Editor',
                            message: message.payload,
                            id: wsRef.current.getComputedTopic(),
                        });
                        break;
                    }
                    case 'CONTENT': {
                        const state = wsRef.current.getState();
                        if (wsRef.current.hasStopped()) {
                            break;
                        }
                        const newRows: IKsqlDbRow[] | null =
                            CommonUtils.stringToObject(payload);
                        if (!newRows) {
                            break;
                        }
                        const totalRows = newRows.length + state.totalRows || 0;

                        notifyUpdateToLoading({
                            title: 'KsqlDb Editor',
                            message: `Streaming ${totalRows} Rows ...`,
                            id: wsRef.current.getComputedTopic(),
                        });

                        const body: KsqlDbStreamQueryRequestBody =
                            state.requestBody;

                        let allRows = null;

                        const resultsSize = 500;

                        const newSize =
                            newRows.length + rowsInnerState.current.length;

                        if (newSize > resultsSize) {
                            const diff = newSize - resultsSize;
                            allRows = [
                                ...newRows,
                                ...rowsInnerState.current.slice(0, diff * -1),
                            ];
                        } else {
                            allRows = [...newRows, ...rowsInnerState.current];
                        }

                        wsRef.current.setState({
                            requestBody: body,
                            totalRows,
                        });
                        transitionnedSetRows(allRows);
                        break;
                    }
                    case 'SUCCEEDED': {
                        const state = wsRef.current.getState();
                        setIsConsuming(false);
                        notifyUpdateToSuccess({
                            title: 'KsqlDb Editor',
                            message:
                                state?.totalRows > 0
                                    ? `Successfully Streamed ${state?.totalRows} Rows`
                                    : 'Found no rows matching your criteria',
                            id: wsRef.current.getComputedTopic(),
                        });
                        wsRef.current.disconnect();
                        wsRef.current = null;
                        break;
                    }
                    case 'FAILED': {
                        setIsConsuming(false);
                        notifyUpdateToError({
                            title: 'KsqlDb Editor',
                            message: payload,
                            id: wsRef.current.getComputedTopic(),
                        });
                        wsRef.current.disconnect();
                        wsRef.current = null;
                        break;
                    }
                }
            },
            onDisconnect: () => {
                setIsConsuming(false);
                if (!wsRef.current) {
                    return;
                }
                const state = wsRef.current.getState();
                if (state?.totalRows > 0) {
                    notifyUpdateToSuccess({
                        title: 'KsqlDb Editor',
                        message: `Successfully Streamed ${state?.totalRows} Rows.`,
                        id: wsRef.current.getComputedTopic(),
                    });
                } else {
                    notifyUpdateToError({
                        title: 'KsqlDb Editor',
                        message: 'Session closed unexpectedly',
                        id: wsRef.current.getComputedTopic(),
                    });
                }
                wsRef.current = null;
            },
        });
    }

    function start(requestBody: KsqlDbStreamQueryRequestBody) {
        wsRef.current = constructWs();
        wsRef.current.prepare();
        wsRef.current.setState({ totalRows: 0, requestBody });
        synchronousSetRows([]);
        setIsConsuming(true);
        notifyLoading({
            title: 'KsqlDb Editor',
            message: 'Started Query Streaming ...',
            id: wsRef.current.getComputedTopic(),
        });

        wsRef.current.connect(requestBody).catch(err => {
            setIsConsuming(false);
            if (err === false) {
                // This means that client has disconnected gracefully
                return;
            }
            notifyUpdateToError({
                title: 'KsqlDb Editor',
                message:
                    CommonUtils.getRestErrorMessage(err) ||
                    'Session closed unexpectedly',
                id: wsRef.current.getComputedTopic(),
            });
            wsRef.current.disconnect();
            wsRef.current = null;
        });
    }

    function stop(forced = true) {
        if (wsRef.current === null) {
            return;
        }
        const state = wsRef.current.getState();
        setIsConsuming(false);
        if (forced) {
            notifyUpdateToSuccess({
                title: 'KsqlDb Editor',
                message: `Stopped Query Streaming ${state?.totalRows} Rows`,
                id: wsRef.current.getComputedTopic(),
            });
        } else {
            notifyUpdateToSuccess({
                title: 'KsqlDb Editor',
                message:
                    state?.totalRows > 0
                        ? `Successfully Streamed ${state?.totalRows} Rows`
                        : 'Found no rows matching your criteria',
                id: wsRef.current.getComputedTopic(),
            });
        }
        wsRef.current.disconnect();
        wsRef.current = null;
    }

    useEffect(() => {
        return () => {
            stop();
            synchronousSetRows([]);
        };
    }, []);

    return { start, stop };
}

export default useKsqlDbStreamQuery;
