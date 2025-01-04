import CommonBody from 'scenes/common/body/CommonBody';
import CreateSubjectVersionBody from './body/CreateSubjectVersionBody';
import CreateSubjectVersionHeader from './header/CreateSubjectVersionHeader';

function CreateSubjectVersionComponent() {
    return (
        <>
            <CreateSubjectVersionHeader />
            <CommonBody>
                <CreateSubjectVersionBody />
            </CommonBody>
        </>
    );
}

export default CreateSubjectVersionComponent;
