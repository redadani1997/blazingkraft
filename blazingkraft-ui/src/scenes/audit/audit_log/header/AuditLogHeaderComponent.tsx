import { Text, Tooltip } from '@mantine/core';
import { CommonUtils } from 'common/utils/CommonUtils';
import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

interface AuditLogHeaderComponentProps {
    auditLogTotalElements: number;
}

function renderTitle(auditLogTotalElements) {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel
                label="Audit Log"
                subLabel={
                    <Tooltip label="Total Elements">
                        <div className="flex font-semibold items-center">
                            <Text className="pl-2" color="dimmed" size="md">
                                (
                                {CommonUtils.beautifyNumber(
                                    auditLogTotalElements,
                                )}
                                )
                            </Text>
                        </div>
                    </Tooltip>
                }
            />
        </div>
    );
}

function AuditLogHeaderComponent({
    auditLogTotalElements,
}: AuditLogHeaderComponentProps) {
    const title = renderTitle(auditLogTotalElements);
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Management',
                },
                {
                    highlighted: true,
                    label: 'Audit',
                },
            ]}
            title={title}
        />
    );
}

export default AuditLogHeaderComponent;
