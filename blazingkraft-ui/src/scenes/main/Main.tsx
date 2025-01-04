import { CommonDesktopUtils } from 'common/utils/CommonDesktopUtils';
import { CommonUtils } from 'common/utils/CommonUtils';
import { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import settingsActions from 'scenes/settings/redux/actions';
import MainComponent from './MainComponent';
import githubActions from './github/actions';

const Main = () => {
    // Map State To Props
    const { isGetPropertiesPending, properties } = useSelector(
        (store: ReduxStore) => {
            return {
                properties: store.settingsReducer.properties,
                isGetPropertiesPending:
                    store.settingsReducer.isGetPropertiesPending,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const getProperties = () => dispatch(settingsActions.getProperties());

    const getLatestRelease = () => dispatch(githubActions.getLatestRelease());

    const retryCountRef = useRef(0);
    const [retryCount, setRetryCount] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string>(null);

    function doGetProperties() {
        getProperties().catch(err => {
            retryCountRef.current++;
            setRetryCount(retryCountRef.current);
            setErrorMessage(CommonUtils.getRestErrorMessage(err));
            setTimeout(() => {
                doGetProperties();
            }, 4000);
        });
    }

    function verifyIsDesktopAppInitialized(): Promise<void> {
        return new Promise((resolve, reject) => {
            const timer = setInterval(() => {
                if (CommonDesktopUtils.isDesktopAppInitialized()) {
                    clearInterval(timer);
                    resolve();
                }
            }, 250);
        });
    }

    useEffect(() => {
        if (CommonDesktopUtils.isWeb()) {
            doGetProperties();
        } else {
            verifyIsDesktopAppInitialized().then(() => {
                doGetProperties();
            });
        }
        getLatestRelease();
    }, []);

    return (
        <MainComponent
            isGetPropertiesPending={isGetPropertiesPending}
            properties={properties}
            retryCount={retryCount}
            errorMessage={errorMessage}
        />
    );
};

export default Main;
