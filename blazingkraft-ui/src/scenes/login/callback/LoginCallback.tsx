import { UserManager } from 'oidc-client-ts';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import loginActions from '../redux/actions';
import LoginCallbackComponent from './LoginCallbackComponent';

const LoginCallback = () => {
    // Map State To Props
    const { properties } = useSelector((store: ReduxStore) => {
        return {
            properties: store.settingsReducer.properties,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const oidcProviderSigninCallback = (
        userManager: UserManager,
        OIDCProviderCode: string,
        OIDCProviderName: string,
    ) =>
        dispatch(
            loginActions.oidcProviderSigninCallback(
                userManager,
                OIDCProviderCode,
                OIDCProviderName,
            ),
        );

    return (
        <>
            <LoginCallbackComponent
                properties={properties}
                oidcProviderSigninCallback={oidcProviderSigninCallback}
            />
        </>
    );
};

export default LoginCallback;
