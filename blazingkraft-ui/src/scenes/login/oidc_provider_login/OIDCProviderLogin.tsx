import { BlazingKraftPropertiesOIDCProvider } from 'scenes/settings/redux';
import OIDCProviderLoginComponent from './OIDCProviderLoginComponent';

interface OIDCProviderLoginProps {
    oidcProvider: BlazingKraftPropertiesOIDCProvider;
    setIsLoadingOIDCConfiguration: (isLoading: boolean) => void;
}

const OIDCProviderLogin = ({
    oidcProvider,
    setIsLoadingOIDCConfiguration,
}: OIDCProviderLoginProps) => {
    // Map State To Props
    // const { isLoginPending, properties } = useSelector((store: ReduxStore) => {
    //     return {
    //         properties: store.settingsReducer.properties,
    //         isLoginPending: store.loginReducer.isLoginPending,
    //     };
    // }, shallowEqual);

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();

    // const login = (username, password) =>
    //     dispatch(loginActions.login(username, password));

    return (
        <OIDCProviderLoginComponent
            oidcProvider={oidcProvider}
            setIsLoadingOIDCConfiguration={setIsLoadingOIDCConfiguration}
        />
    );
};

export default OIDCProviderLogin;
