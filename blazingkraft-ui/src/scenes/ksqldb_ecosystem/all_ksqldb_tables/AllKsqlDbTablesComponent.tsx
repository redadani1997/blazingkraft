import CommonBody from 'scenes/common/body/CommonBody';
import AllKsqlDbTablesBody from './body/AllKsqlDbTablesBody';
import AllKsqlDbTablesHeader from './header/AllKsqlDbTablesHeader';

interface AllKsqlDbTablesComponentProps {
    refreshPageContent: () => void;
}

function AllKsqlDbTablesComponent({
    refreshPageContent,
}: AllKsqlDbTablesComponentProps) {
    return (
        <>
            <AllKsqlDbTablesHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllKsqlDbTablesBody />
            </CommonBody>
        </>
    );
}

export default AllKsqlDbTablesComponent;
