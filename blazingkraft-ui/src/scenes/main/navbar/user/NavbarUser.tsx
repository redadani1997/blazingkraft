import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import NavbarUserComponent from './NavbarUserComponent';

interface NavbarUserProps {
    opened: boolean;
}

const NavbarUser = ({ opened }: NavbarUserProps) => {
    // Map State To Props
    const { connectedUser } = useSelector((store: ReduxStore) => {
        return {
            connectedUser: store.loginReducer.connectedUser,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    if (CommonValidationUtils.isFalsy(connectedUser)) {
        return <></>;
    }

    return (
        <>
            <NavbarUserComponent
                opened={opened}
                connectedUser={connectedUser}
            />
        </>
    );
};

export default NavbarUser;
