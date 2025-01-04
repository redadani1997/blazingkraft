import CommonBody from 'scenes/common/body/CommonBody';
import CreateConnectorBody from './body/CreateConnectorBody';
import CreateConnectorHeader from './header/CreateConnectorHeader';

interface CreateConnectorComponentProps {
    refreshPageContent: () => void;
}

function CreateConnectorComponent({
    refreshPageContent,
}: CreateConnectorComponentProps) {
    return (
        <>
            <CreateConnectorHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <CreateConnectorBody />
            </CommonBody>
        </>
    );
}

export default CreateConnectorComponent;
