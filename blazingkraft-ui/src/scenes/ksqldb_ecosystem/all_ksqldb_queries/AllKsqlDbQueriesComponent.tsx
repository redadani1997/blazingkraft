import CommonBody from 'scenes/common/body/CommonBody';
import AllKsqlDbQueriesBody from './body/AllKsqlDbQueriesBody';
import AllKsqlDbQueriesHeader from './header/AllKsqlDbQueriesHeader';

interface AllKsqlDbQueriesComponentProps {
    refreshPageContent: () => void;
}

function AllKsqlDbQueriesComponent({
    refreshPageContent,
}: AllKsqlDbQueriesComponentProps) {
    return (
        <>
            <AllKsqlDbQueriesHeader refreshPageContent={refreshPageContent} />
            <CommonBody>
                <AllKsqlDbQueriesBody />
            </CommonBody>
        </>
    );
}

export default AllKsqlDbQueriesComponent;
