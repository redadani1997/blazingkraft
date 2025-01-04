import CommonBody from 'scenes/common/body/CommonBody';
import CreateSubjectBody from './body/CreateSubjectBody';
import CreateSubjectHeader from './header/CreateSubjectHeader';

function CreateSubjectComponent() {
    return (
        <>
            <CreateSubjectHeader />
            <CommonBody>
                <CreateSubjectBody />
            </CommonBody>
        </>
    );
}

export default CreateSubjectComponent;
