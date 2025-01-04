import CommonBody from 'scenes/common/body/CommonBody';
import AuditLogBody from './body/AuditLogBody';
import AuditLogHeader from './header/AuditLogHeader';

function AuditLogComponent() {
    return (
        <>
            <AuditLogHeader />
            <CommonBody>
                <AuditLogBody />
            </CommonBody>
        </>
    );
}

export default AuditLogComponent;
