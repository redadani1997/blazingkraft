import CommonBody from 'scenes/common/body/CommonBody';
import CreateUserBody from './body/CreateUserBody';
import CreateUserHeader from './header/CreateUserHeader';

function CreateUserComponent() {
    return (
        <>
            <CreateUserHeader />
            <CommonBody>
                <CreateUserBody />
            </CommonBody>
        </>
    );
}

export default CreateUserComponent;
