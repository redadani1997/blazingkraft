import { AuditClusterActions } from 'common/audit/AuditClusterActions';
import { AuditKafkaConnectActions } from 'common/audit/AuditKafkaConnectActions';
import { AuditKsqlDbActions } from 'common/audit/AuditKsqlDbActions';
import { AuditManagementActions } from 'common/audit/AuditManagementActions';
import { AuditSchemaRegistryActions } from 'common/audit/AuditSchemaRegistryActions';
import { CommonUtils } from './CommonUtils';

const AuditActionsLabelsByActions: Map<string, string> =
    CommonUtils.objectToMap({
        ...AuditManagementActions.AUDIT_MANAGEMENT_ACTIONS_LABEL_BY_ACTION,
        ...AuditClusterActions.AUDIT_CLUSTER_ACTIONS_LABEL_BY_ACTION,
        ...AuditKafkaConnectActions.AUDIT_KAFKA_CONNECT_ACTIONS_LABEL_BY_ACTION,
        ...AuditSchemaRegistryActions.AUDIT_SCHEMA_REGISTRY_ACTIONS_LABEL_BY_ACTION,
        ...AuditKsqlDbActions.AUDIT_KSQLDB_ACTIONS_LABEL_BY_ACTION,
    });

function getAuditActionLabelByAction(action: string): string {
    return AuditActionsLabelsByActions.get(action);
}

function getAuditActionsOptions(): {
    label: string;
    value: string;
    group: string;
}[] {
    return [
        ...AuditManagementActions.AUDIT_MANAGEMENT_ACTIONS_OPTIONS,
        ...AuditClusterActions.AUDIT_CLUSTER_ACTIONS_OPTIONS,
        ...AuditKafkaConnectActions.AUDIT_KAFKA_CONNECT_ACTIONS_OPTIONS,
        ...AuditSchemaRegistryActions.AUDIT_SCHEMA_REGISTRY_ACTIONS_OPTIONS,
        ...AuditKsqlDbActions.AUDIT_KSQLDB_ACTIONS_OPTIONS,
    ];
}

function getSeverityOptions(): {
    label: string;
    value: string;
}[] {
    return [
        {
            label: 'Low',
            value: 'LOW',
        },
        {
            label: 'Medium',
            value: 'MEDIUM',
        },
        {
            label: 'High',
            value: 'HIGH',
        },
    ];
}

function getSeverityLabelBySeverity(severity: string): string {
    const severityOptions = getSeverityOptions();
    const severityOption = severityOptions.find(
        option => option.value === severity,
    );
    return severityOption ? severityOption.label : undefined;
}

function getAuditLevelOptions(): {
    label: string;
    value: string;
}[] {
    return [
        {
            label: 'Info',
            value: 'INFO',
        },
        {
            label: 'Error',
            value: 'ERROR',
        },
    ];
}

function getAuditLevelLabelByAuditLevel(auditLevel: string): string {
    const auditLevelOptions = getAuditLevelOptions();
    const auditLevelOption = auditLevelOptions.find(
        option => option.value === auditLevel,
    );
    return auditLevelOption ? auditLevelOption.label : undefined;
}

function getEntityTypeOptions(): {
    label: string;
    value: string;
}[] {
    return [
        {
            label: 'Cluster',
            value: 'CLUSTER',
        },
        {
            label: 'Kafka Connect',
            value: 'KAFKA_CONNECT',
        },
        {
            label: 'Schema Registry',
            value: 'SCHEMA_REGISTRY',
        },
        {
            label: 'KsqlDb',
            value: 'KSQLDB',
        },
        {
            label: 'Management',
            value: 'MANAGEMENT',
        },
    ];
}

function getEntityTypeLabelByEntityType(entityType: string): string {
    const entityTypeOptions = getEntityTypeOptions();
    const entityTypeOption = entityTypeOptions.find(
        option => option.value === entityType,
    );
    return entityTypeOption ? entityTypeOption.label : undefined;
}

const AuditUtils = {
    getAuditActionsOptions,
    getAuditActionLabelByAction,
    getSeverityOptions,
    getSeverityLabelBySeverity,
    getAuditLevelOptions,
    getAuditLevelLabelByAuditLevel,
    getEntityTypeOptions,
    getEntityTypeLabelByEntityType,
};

export { AuditUtils };
