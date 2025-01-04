import CommonBody from 'scenes/common/body/CommonBody';
import CreateClusterBody from './body/CreateClusterBody';
import CreateClusterHeader from './header/CreateClusterHeader';

function CreateClusterComponent() {
    return (
        <>
            <CreateClusterHeader />
            <CommonBody>
                <CreateClusterBody />
            </CommonBody>
        </>
    );
}

export default CreateClusterComponent;
