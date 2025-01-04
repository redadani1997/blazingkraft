import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import { ActivePage } from '..';
import NavbarSecondaryPageComponent from './NavbarSecondaryPageComponent';

interface NavbarSecondaryPageProps {
    activePage: ActivePage;
    setActivePage: (activePage: ActivePage) => void;
}

const NavbarSecondaryPage = ({
    activePage,
    setActivePage,
}: NavbarSecondaryPageProps) => {
    // Map State To Props
    const { activeLink } = useSelector((store: ReduxStore) => {
        return {
            activeLink: store.routeReducer.activeLink,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    return (
        <>
            <NavbarSecondaryPageComponent
                activeLink={activeLink}
                activePage={activePage}
                setActivePage={setActivePage}
            />
        </>
    );
};

export default NavbarSecondaryPage;
