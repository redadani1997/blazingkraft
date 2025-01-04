import { useDocumentTitle } from '@mantine/hooks';
import CommonBody from 'scenes/common/body/CommonBody';
import CreateGroupBody from './body/CreateGroupBody';
import CreateGroupHeader from './header/CreateGroupHeader';

function CreateGroupComponent() {
    useDocumentTitle('Blazing KRaft - Create Group');

    return (
        <>
            <CreateGroupHeader />
            <CommonBody>
                <CreateGroupBody />
            </CommonBody>
        </>
    );
}

export default CreateGroupComponent;
