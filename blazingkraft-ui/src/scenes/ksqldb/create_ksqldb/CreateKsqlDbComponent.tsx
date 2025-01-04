import CommonBody from 'scenes/common/body/CommonBody';
import CreateKsqlDbBody from './body/CreateKsqlDbBody';
import CreateKsqlDbHeader from './header/CreateKsqlDbHeader';

function CreateKsqlDbComponent() {
    return (
        <>
            <CreateKsqlDbHeader />
            <CommonBody>
                <CreateKsqlDbBody />
            </CommonBody>
        </>
    );
}

export default CreateKsqlDbComponent;
