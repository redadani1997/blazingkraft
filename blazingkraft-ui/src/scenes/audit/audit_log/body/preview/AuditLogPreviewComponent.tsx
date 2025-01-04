import { Grid, Text } from '@mantine/core';
import { AuditUtils } from 'common/utils/AuditUtils';
import { CommonTimeUtils } from 'common/utils/CommonTimeUtils ';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { IAuditLog } from 'scenes/audit/redux';
import CommonCardDetails from 'scenes/common/card_details/CommonCardDetails';
import CommonModal from 'scenes/common/modal/CommonModal';

interface AuditLogPreviewComponentProps {
    auditLog: IAuditLog | null;
    isModalOpen: boolean;
    setIsModalOpen: Function;
    timeFormat: string;
    timezone: string;
}

function renderAttribute(label: string, value: any) {
    return (
        <CommonCardDetails
            title={label}
            content={<Text className="italic">{value}</Text>}
            copyText={value}
        />
    );
}

function renderUnavailable() {
    return '---unavailable---';
}

function renderModalBody(
    auditLog: IAuditLog | null,
    timezone: string,
    timeFormat: string,
) {
    if (CommonValidationUtils.isFalsy(auditLog)) return <></>;
    return (
        <div className="flex flex-col">
            <Grid>
                <Grid.Col span={12} sm={6} lg={5}>
                    {renderAttribute(
                        'Action',
                        AuditUtils.getAuditActionLabelByAction(auditLog.action),
                    )}
                </Grid.Col>
                <Grid.Col span={12} sm={6} lg={3}>
                    {renderAttribute(
                        'Entity Type',
                        AuditUtils.getEntityTypeLabelByEntityType(
                            auditLog.entityType,
                        ) || renderUnavailable(),
                    )}
                </Grid.Col>
                <Grid.Col span={12} sm={6} lg={4}>
                    {renderAttribute(
                        'Entity',
                        auditLog.entity || renderUnavailable(),
                    )}
                </Grid.Col>
                <Grid.Col span={12} sm={6} lg={4}>
                    {renderAttribute(
                        'Subject',
                        auditLog.subject || renderUnavailable(),
                    )}
                </Grid.Col>
                <Grid.Col span={12} sm={6} lg={4}>
                    {renderAttribute(
                        'User Identifier',
                        auditLog.userIdentifier,
                    )}
                </Grid.Col>
                <Grid.Col span={12} sm={6} lg={4}>
                    {renderAttribute(
                        'User Displayed Name',
                        auditLog.userDisplayedName,
                    )}
                </Grid.Col>
                <Grid.Col span={12} sm={6} lg={3}>
                    {renderAttribute(
                        'Audit Level',
                        AuditUtils.getAuditLevelLabelByAuditLevel(
                            auditLog.auditLevel,
                        ),
                    )}
                </Grid.Col>
                <Grid.Col span={12} sm={6} lg={3}>
                    {renderAttribute(
                        'Severity',
                        AuditUtils.getSeverityLabelBySeverity(
                            auditLog.severity,
                        ),
                    )}
                </Grid.Col>
                <Grid.Col span={12} sm={12} lg={6}>
                    {renderAttribute(
                        'Timestamp',
                        CommonTimeUtils.timestampToFormattedDate(
                            auditLog.timestamp,
                            timezone,
                            timeFormat,
                        ),
                    )}
                </Grid.Col>
                <Grid.Col span={12}>
                    {renderAttribute(
                        'Settled Message',
                        auditLog.settledMessage || renderUnavailable(),
                    )}
                </Grid.Col>
            </Grid>
        </div>
    );
}

function AuditLogPreviewComponent({
    isModalOpen,
    auditLog,
    setIsModalOpen,
    timezone,
    timeFormat,
}: AuditLogPreviewComponentProps) {
    const modalBody = renderModalBody(auditLog, timezone, timeFormat);
    return (
        <CommonModal
            isOpen={isModalOpen}
            modalBody={modalBody}
            modalTitle={
                <div className="flex items-center">
                    <Text className="pr-2">Audit Log Entry</Text>
                </div>
            }
            onClose={() => setIsModalOpen(false)}
        />
    );
}

export default AuditLogPreviewComponent;
