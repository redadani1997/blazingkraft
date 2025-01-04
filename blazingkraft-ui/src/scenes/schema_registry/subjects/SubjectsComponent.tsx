import CommonBody from 'scenes/common/body/CommonBody';
import SubjectsBody from './body/SubjectsBody';
import SubjectsHeader from './header/SubjectsHeader';

interface SubjectsComponentProps {
    refreshPageContent: () => void;
}

function SubjectsComponent({ refreshPageContent }: SubjectsComponentProps) {
    return (
        <>
            <SubjectsHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <SubjectsBody />
            </CommonBody>
        </>
    );
}

export default SubjectsComponent;
