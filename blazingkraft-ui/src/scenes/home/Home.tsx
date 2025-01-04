import { useDocumentTitle } from '@mantine/hooks';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import HomeComponent from './HomeComponent';

const Home = () => {
    useDocumentTitle('Blazing KRaft');

    // Map State To Props
    const { features } = useSelector((store: ReduxStore) => {
        return {
            features: store.settingsReducer.features,
        };
    }, shallowEqual);
    // Map Dispatch To Props

    if (!features) return <></>;

    return <HomeComponent />;
};

export default Home;
