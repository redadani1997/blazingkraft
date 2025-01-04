import { useDocumentTitle } from '@mantine/hooks';
import KsqlDbEditorComponent from './KsqlDbEditorComponent';

const KsqlDbEditor = () => {
    useDocumentTitle('Blazing KRaft - KsqlDb Editor');

    // Map State To Props

    // Map Dispatch To Props

    return (
        <>
            <KsqlDbEditorComponent />
        </>
    );
};

export default KsqlDbEditor;
