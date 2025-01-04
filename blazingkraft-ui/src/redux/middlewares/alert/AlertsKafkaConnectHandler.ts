import { notifySuccess } from 'common/notifications/Notifications';
import connectorTypes from 'scenes/connector/redux/types';
import kafkaConnectTypes from 'scenes/kafka_connect/redux/types';

function handle(action): boolean {
    switch (action.type) {
        case kafkaConnectTypes.CREATE_KAFKA_CONNECT_FULFILLED: {
            const { context, kafkaConnectCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Kafka Connect '${kafkaConnectCode}' created Successfully.`,
            });
            return true;
        }
        case kafkaConnectTypes.EDIT_KAFKA_CONNECT_FULFILLED: {
            const { context, kafkaConnectCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Kafka Connect '${kafkaConnectCode}' edited Successfully.`,
            });
            return true;
        }
        case kafkaConnectTypes.DELETE_KAFKA_CONNECT_FULFILLED: {
            const { context, kafkaConnectCode } = action.meta;
            notifySuccess({
                title: context,
                message: `Kafka Connect '${kafkaConnectCode}' deleted Successfully.`,
            });
            return true;
        }
        case connectorTypes.CREATE_CONNECTOR_FULFILLED: {
            const { context, connector } = action.meta;
            notifySuccess({
                title: context,
                message: `Connector '${connector}' created Successfully.`,
            });
            return true;
        }
        case connectorTypes.EDIT_CONNECTOR_CONFIG_FULFILLED: {
            const { context, connector } = action.meta;
            notifySuccess({
                title: context,
                message: `Connector '${connector}' edited Successfully.`,
            });
            return true;
        }
        case connectorTypes.RESUME_CONNECTOR_FULFILLED: {
            const { context, connector } = action.meta;
            notifySuccess({
                title: context,
                message: `Connector '${connector}' resumed Successfully.`,
            });
            return true;
        }
        case connectorTypes.PAUSE_CONNECTOR_FULFILLED: {
            const { context, connector } = action.meta;
            notifySuccess({
                title: context,
                message: `Connector '${connector}' paused Successfully.`,
            });
            return true;
        }
        case connectorTypes.RESTART_CONNECTOR_FULFILLED: {
            const { context, connector } = action.meta;
            notifySuccess({
                title: context,
                message: `Connector '${connector}' restarted Successfully.`,
            });
            return true;
        }
        case connectorTypes.DESTROY_CONNECTOR_FULFILLED: {
            const { context, connector } = action.meta;
            notifySuccess({
                title: context,
                message: `Connector '${connector}' destroyed Successfully.`,
            });
            return true;
        }
        case connectorTypes.RESTART_CONNECTOR_TASK_FULFILLED: {
            const { context, connector, task } = action.meta;
            notifySuccess({
                title: context,
                message: `Task '${task}' for Connector '${connector}' restarted Successfully.`,
            });
            return true;
        }
        case connectorTypes.RESET_CONNECTOR_ACTIVE_TOPICS_FULFILLED: {
            const { context, connector } = action.meta;
            notifySuccess({
                title: context,
                message: `Connector '${connector}' topics were reset Successfully.`,
            });
            return true;
        }

        default:
            return false;
    }
}

const AlertsKafkaConnectHandler = {
    handle,
};

export { AlertsKafkaConnectHandler };
