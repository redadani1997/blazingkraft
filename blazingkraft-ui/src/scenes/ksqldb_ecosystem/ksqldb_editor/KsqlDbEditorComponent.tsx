import CommonBody from 'scenes/common/body/CommonBody';
import KsqlDbEditorBody from './body/KsqlDbEditorBody';
import KsqlDbEditorHeader from './header/KsqlDbEditorHeader';

function KsqlDbEditorComponent() {
    return (
        <>
            <KsqlDbEditorHeader />
            <CommonBody>
                <KsqlDbEditorBody />
            </CommonBody>
        </>
    );
}

export default KsqlDbEditorComponent;
