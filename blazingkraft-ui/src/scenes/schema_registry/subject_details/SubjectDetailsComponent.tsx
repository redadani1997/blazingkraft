import CommonBody from 'scenes/common/body/CommonBody';
import SubjectDetailsBody from './body/SubjectDetailsBody';
import SubjectDetailsHeader from './header/SubjectDetailsHeader';

function SubjectDetailsComponent() {
    return (
        <>
            <SubjectDetailsHeader />

            <CommonBody>
                <SubjectDetailsBody />
            </CommonBody>
        </>
    );
}

export default SubjectDetailsComponent;
