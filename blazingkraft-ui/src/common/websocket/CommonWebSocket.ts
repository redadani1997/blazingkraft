import { Client } from '@stomp/stompjs';
import { ReduxStore } from 'redux_config/reducers';
import store from 'redux_config/store';
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import { v4 as uuidv4 } from 'uuid';

let BLAZINGKRAFT_API_WS_URL = '/api/ws';

function SET_BLAZINGKRAFT_API_WS_URL(url: string) {
    BLAZINGKRAFT_API_WS_URL = `${url}/ws`;
}

interface ICommonWebSocket {
    topic: '/queue/consumer' | '/queue/stream' | '/queue/ksqldb';
    onMessage: (message: CommonWebSocketFrame) => void;
    onDisconnect: () => void;
}

export interface CommonWebSocketFrame {
    payload: string;
    type: 'INFO' | 'SUCCEEDED' | 'FAILED' | 'CONTENT';
}

class CommonWebSocket {
    private client: Client = null;
    private topic = null;
    private computedTopic = null;
    private onMessage = null;
    private onDisconnect = null;
    private state = null;
    private isRunning = false;
    private textEncoder = new TextDecoder();

    constructor({ topic, onMessage, onDisconnect }: ICommonWebSocket) {
        this.topic = topic;
        this.onMessage = onMessage;
        this.onDisconnect = onDisconnect;
    }

    prepare() {
        this.computedTopic = `${this.topic}/${uuidv4()}`;
        this.state = null;
        this.isRunning = false;
        this.client = null;
    }

    connect(requestBody = null) {
        if (this.computedTopic === null) {
            throw new Error('prepare() must be called before connect()');
        }
        this.isRunning = true;
        return new Promise((resolve, reject) => {
            try {
                const reduxStore: ReduxStore = store.getState();

                this.client = new Client({
                    connectHeaders: {
                        Authorization:
                            'Bearer ' + reduxStore.loginReducer.token,
                    },
                    splitLargeFrames: false,
                    maxWebSocketChunkSize: 1024 * 1024,
                    reconnectDelay: undefined,
                    heartbeatIncoming: 300,
                    heartbeatOutgoing: 300,
                    webSocketFactory: () => {
                        //  websocket - xhr-streaming - xdr-streaming - eventsource - iframe-eventsource
                        const ws: WebSocket = new SockJS(
                            BLAZINGKRAFT_API_WS_URL,
                            null,
                            {
                                transports: [
                                    'websocket',
                                    'eventsource',
                                    'xhr-streaming',
                                    'xdr-streaming',
                                ],
                            },
                        );
                        return ws;
                    },
                });

                this.client.activate();

                this.client.onConnect = frame => {
                    if (!this.isRunning) {
                        reject(
                            new Error('Concurrent connection, retry again.'),
                        );
                        return;
                    }
                    try {
                        this.subscribe(requestBody);
                        resolve(frame);
                    } catch (err) {
                        reject(err);
                    }
                };
                this.client.onDisconnect = () => {
                    if (!this.isRunning) {
                        return;
                    }
                    this.isRunning = false;
                    this.onDisconnect();
                    this.client = null;
                    reject(false);
                };
                this.client.onWebSocketClose = () => {
                    if (!this.isRunning) {
                        return;
                    }
                    this.isRunning = false;
                    this.onDisconnect();
                    this.client = null;
                    reject(false);
                };
                this.client.onStompError = () => {
                    if (!this.isRunning) {
                        return;
                    }
                    this.isRunning = false;
                    this.onDisconnect();
                    this.client = null;
                    reject(false);
                };
            } catch (err) {
                reject(err);
            }
        });
    }

    private subscribe(requestBody) {
        const headers = requestBody
            ? { requestBody: JSON.stringify(requestBody) }
            : null;
        this.client.subscribe(
            this.computedTopic,
            message => {
                if (!this.isRunning) {
                    return;
                }
                try {
                    const content = message.body
                        ? JSON.parse(message.body)
                        : {};
                    this.onMessage(content);
                } catch (err) {
                    console.error('Error Parsing Message Body => ', err);
                }
            },
            headers,
        );
    }

    disconnect() {
        if (this.client) {
            this.isRunning = false;
            this.client.deactivate();
            this.client = null;
        }
    }

    sendMessage(message: string) {
        if (this.client) {
            this.client.publish({
                destination: this.computedTopic,
                body: message,
            });
        }
    }

    getComputedTopic() {
        return this.computedTopic;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
    }
    hasStopped() {
        return !this.isRunning;
    }
}

export default CommonWebSocket;

export { SET_BLAZINGKRAFT_API_WS_URL };
