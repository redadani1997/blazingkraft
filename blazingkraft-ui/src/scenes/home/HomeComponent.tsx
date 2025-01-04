import CommonBody from 'scenes/common/body/CommonBody';
import HomeBody from './body/HomeBody';
import HomeHeader from './header/HomeHeader';

function HomeComponent() {
    return (
        <>
            <HomeHeader />
            <CommonBody>
                <HomeBody />
            </CommonBody>
        </>
    );
}

export default HomeComponent;
