import {
    notifyLoading,
    notifyUpdateToError,
    notifyUpdateToLoading,
    notifyUpdateToSuccess,
} from 'common/notifications/Notifications';
import { BlazingConsumptionResponse } from 'common/types/consumer';
import { CommonUtils } from 'common/utils/CommonUtils';
import CommonWebSocket from 'common/websocket/CommonWebSocket';
import { MutableRefObject, useEffect, useRef } from 'react';
import { TextSearchFilter } from '../blazing_consumer_filter/BlazingConsumerFilterComponent';

export interface RecordConsumptionRequestBody {
    resultsSize: number;
    clusterCode: string;
    topics: string[];
    keySchema?: string;
    valueSchema?: string;
    consumerAdditionalFiltersRequest?: {
        timeFilter: {
            disabled: boolean;
            start: number;
            end: number;
            earliest: boolean;
            latest: boolean;
            liveConsumption: boolean;
        };
        partitionFilter: {
            [key: string]: number[];
        };
        offsetFilter: {
            disabled: boolean;
            offsets: {
                [key: string]: number;
            };
        };
        groupIdFilter?: string;
        javascriptFilter: {
            disabled: boolean;
            code: string;
        };
        textSearchFilter: TextSearchFilter;
    };
    consumerAdditionalConfigurationRequest: {
        keyDeserializer: string;
        keyDeserializerConfiguration: Map<string, any>;
        valueDeserializer: string;
        valueDeserializerConfiguration: Map<string, any>;
    };
}

const CONSUMER_NOTIFICATION_SUCCESS_MS = 1000 * 15;

function getLoadingMessage(processed, totalRecords, totalBytes, timer) {
    if (totalRecords > 0) {
        return (
            <div className="flex flex-col">
                <span>
                    Processing {CommonUtils.beautifyNumber(processed)}{' '}
                    records...
                </span>
                <span>
                    Consuming {CommonUtils.beautifyNumber(totalRecords)}{' '}
                    records...
                </span>
                <span>
                    {CommonUtils.beautifyBytes(totalBytes)} in{' '}
                    {CommonUtils.beautifyMilliseconds(timer)}
                </span>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col">
                <span>
                    Processing {CommonUtils.beautifyNumber(processed)}{' '}
                    records...
                </span>
                <span>In {CommonUtils.beautifyMilliseconds(timer)} </span>
            </div>
        );
    }
}
function getSettledMessage(processed, totalRecords, totalBytes, timer) {
    if (totalRecords > 0) {
        return (
            <div className="flex flex-col">
                <span>
                    Processed {CommonUtils.beautifyNumber(processed)} records.
                </span>
                <span>
                    Successfully Consumed{' '}
                    {CommonUtils.beautifyNumber(totalRecords)} records.
                </span>
                <span>
                    {CommonUtils.beautifyBytes(totalBytes)} in{' '}
                    {CommonUtils.beautifyMilliseconds(timer)}
                </span>
            </div>
        );
    } else if (processed > 0) {
        return (
            <div className="flex flex-col">
                <span>
                    Processed {CommonUtils.beautifyNumber(processed)} records.
                </span>
                <span>Found no records matching your criteria.</span>
                <span>In {CommonUtils.beautifyMilliseconds(timer)} </span>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col">
                <span>Found no records matching your criteria.</span>
                <span>In {CommonUtils.beautifyMilliseconds(timer)} </span>
            </div>
        );
    }
}

function getStoppedMessage(processed, totalRecords, totalBytes, timer) {
    return (
        <div className="flex flex-col">
            <span>
                Processed {CommonUtils.beautifyNumber(processed)} records.
            </span>
            <span>
                Stopped Consuming {CommonUtils.beautifyNumber(totalRecords)}{' '}
                records.
            </span>
            <span>
                {CommonUtils.beautifyBytes(totalBytes)} in{' '}
                {CommonUtils.beautifyMilliseconds(timer)}
            </span>
        </div>
    );
}

function useKafkaConsumer(
    synchronousSetAllRecords: (records: BlazingConsumptionResponse[]) => void,
    transitionnedSetAllRecords: (records: BlazingConsumptionResponse[]) => void,
    recordsInnerState: MutableRefObject<BlazingConsumptionResponse[]>,
    setIsConsuming: (isConsuming: boolean) => void,
) {
    const wsRef = useRef<CommonWebSocket | null>(null);
    const timerRef = useRef<number>(0);
    const timerIntervalRef = useRef(null);

    function startTimer() {
        timerRef.current = 0;
        timerIntervalRef.current = setInterval(() => {
            if (!wsRef.current || wsRef.current.hasStopped()) {
                return;
            }

            timerRef.current = timerRef.current + 250;
            const state = wsRef.current.getState();
            notifyUpdateToLoading({
                title: 'Records Consumption',
                message: getLoadingMessage(
                    state.processed,
                    state?.totalRecords,
                    state?.totalBytes,
                    timerRef.current,
                ),
                id: wsRef.current.getComputedTopic(),
            });
        }, 250);
    }

    function stopTimer() {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }
        timerIntervalRef.current = null;
    }

    function constructWs(): CommonWebSocket | null {
        return new CommonWebSocket({
            topic: '/queue/consumer',
            onMessage: message => {
                if (!wsRef.current) {
                    return;
                }
                const { type, payload } = message;
                switch (type) {
                    case 'INFO': {
                        const state = wsRef.current.getState();
                        wsRef.current.setState({
                            processed: payload,
                            requestBody: state?.requestBody,
                            totalRecords: state?.totalRecords,
                            totalBytes: state?.totalBytes,
                        });
                        break;
                    }
                    case 'CONTENT': {
                        const state = wsRef.current.getState();
                        if (wsRef.current.hasStopped()) {
                            break;
                        }
                        const newRecords: BlazingConsumptionResponse[] | null =
                            CommonUtils.stringToObject(payload);
                        if (!newRecords) {
                            break;
                        }
                        const totalBytes = calculateTotalBytes(
                            state.totalBytes || 0,
                            newRecords,
                        );
                        const totalRecords =
                            newRecords.length + state.totalRecords || 0;

                        const body: RecordConsumptionRequestBody =
                            state.requestBody;

                        const { resultsSize } = body;

                        const isLiveConsumption =
                            body?.consumerAdditionalFiltersRequest?.timeFilter
                                ?.liveConsumption;

                        if (isLiveConsumption) {
                            recordsInnerState.current = [
                                ...newRecords,
                                ...recordsInnerState.current,
                            ];
                        } else {
                            recordsInnerState.current = [
                                ...recordsInnerState.current,
                                ...newRecords,
                            ];
                        }

                        wsRef.current.setState({
                            processed: state.processed,
                            requestBody: body,
                            totalBytes,
                            totalRecords,
                        });

                        if (resultsSize !== 0) {
                            transitionnedSetAllRecords(
                                recordsInnerState.current,
                            );
                        } else {
                            // no-op
                        }
                        break;
                    }
                    case 'SUCCEEDED': {
                        recordsInnerState.current = [];
                        stopTimer();
                        const state = wsRef.current.getState();
                        setIsConsuming(false);
                        notifyUpdateToSuccess({
                            title: 'Records Consumption',
                            message: getSettledMessage(
                                state?.processed,
                                state?.totalRecords,
                                state?.totalBytes,
                                timerRef.current,
                            ),
                            id: wsRef.current.getComputedTopic(),
                            autoClose: CONSUMER_NOTIFICATION_SUCCESS_MS,
                        });
                        wsRef.current.disconnect();
                        wsRef.current = null;
                        break;
                    }
                    case 'FAILED': {
                        stopTimer();
                        setIsConsuming(false);
                        notifyUpdateToError({
                            title: 'Records Consumption',
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
                stopTimer();
                setIsConsuming(false);
                const state = wsRef.current.getState();
                if (state?.totalRecords > 0) {
                    notifyUpdateToSuccess({
                        title: 'Records Consumption',
                        message: getSettledMessage(
                            state?.processed,
                            state?.totalRecords,
                            state?.totalBytes,
                            timerRef.current,
                        ),
                        id: wsRef.current.getComputedTopic(),
                        autoClose: CONSUMER_NOTIFICATION_SUCCESS_MS,
                    });
                } else {
                    notifyUpdateToError({
                        title: 'Records Consumption',
                        message: (
                            <div className="flex flex-col">
                                <span>
                                    Processed {state?.processed} records.
                                </span>
                                <span>Session closed unexpectedly</span>
                            </div>
                        ),
                        id: wsRef.current.getComputedTopic(),
                    });
                }
                wsRef.current = null;
            },
        });
    }

    function start(requestBody: RecordConsumptionRequestBody) {
        recordsInnerState.current = [];
        wsRef.current = constructWs();
        wsRef.current.prepare();
        wsRef.current.setState({
            processed: 0,
            totalBytes: 0,
            totalRecords: 0,
            requestBody,
        });
        synchronousSetAllRecords([]);
        setIsConsuming(true);
        notifyLoading({
            title: 'Records Consumption',
            message: 'Started Records Consumption ...',
            id: wsRef.current.getComputedTopic(),
        });

        startTimer();

        wsRef.current.connect(requestBody).catch(err => {
            setIsConsuming(false);
            if (err === false) {
                // This means that client has disconnected gracefully
                return;
            }
            notifyUpdateToError({
                title: 'Records Consumption',
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
        recordsInnerState.current = [];
        if (!wsRef.current) {
            return;
        }
        stopTimer();
        const state = wsRef.current.getState();
        setIsConsuming(false);
        if (forced) {
            notifyUpdateToSuccess({
                title: 'Records Consumption',
                message: getStoppedMessage(
                    state?.processed,
                    state?.totalRecords,
                    state?.totalBytes,
                    timerRef.current,
                ),
                id: wsRef.current.getComputedTopic(),
                autoClose: CONSUMER_NOTIFICATION_SUCCESS_MS,
            });
        } else {
            notifyUpdateToSuccess({
                title: 'Records Consumption',
                message: getSettledMessage(
                    state?.processed,
                    state?.totalRecords,
                    state?.totalBytes,
                    timerRef.current,
                ),
                id: wsRef.current.getComputedTopic(),
                autoClose: CONSUMER_NOTIFICATION_SUCCESS_MS,
            });
        }
        wsRef.current.disconnect();
        wsRef.current = null;
    }

    useEffect(() => {
        return () => {
            stop();
            synchronousSetAllRecords([]);
        };
    }, []);

    return { start, stop };
}

function calculateTotalBytes(
    base: number,
    consumerRecords: BlazingConsumptionResponse[],
) {
    let totalBytes = base;
    consumerRecords.forEach(record => {
        totalBytes +=
            record.metadata.serializedKeySize +
            record.metadata.serializedValueSize;
    });
    return totalBytes;
}

export default useKafkaConsumer;
