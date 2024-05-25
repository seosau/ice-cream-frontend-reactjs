import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
    constructor() {
        this.client = null;
        this.subscriptions = {};
        this.connected = false;
    }

    connect(onConnected, onError) {
        const socket = new SockJS(`${process.env.REACT_APP_API_BASE_URL}/api/ws`);
        this.client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: (frame) => {
                this.connected = true;
                onConnected(frame);
            },
            onStompError: (frame) => {
                this.connected = false;
                onError(frame);
            },
            onWebSocketClose: () => {
                this.connected = false;
            },
            onDisconnect: () => {
                this.connected = false;
            }
        });
        this.client.activate();
    }

    disconnect() {
        if (this.client) {
            this.client.deactivate();
            this.connected = false;
        }
    }

    subscribe(topic, callback) {
        if (this.connected && this.client) {
            const subscription = this.client.subscribe(topic, message => {
                callback(JSON.parse(message.body));
            });
            this.subscriptions[topic] = subscription;
        } else {
            console.error('Cannot subscribe, client is not connected');
        }
    }

    unsubscribe(topic) {
        if (this.subscriptions[topic]) {
            this.subscriptions[topic].unsubscribe();
            delete this.subscriptions[topic];
        }
    }

    send(destination, payload) {
        if (this.connected && this.client) {
            this.client.publish({ destination, body: JSON.stringify(payload) });
        } else {
            console.error('Cannot send message, client is not connected');
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;
