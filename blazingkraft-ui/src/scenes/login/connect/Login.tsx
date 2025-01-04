import { useDocumentTitle } from '@mantine/hooks';
import useCommonLocalStorage from 'common/hooks/localstorage/useCommonLocalStorage';
import { CommonDesktopUtils } from 'common/utils/CommonDesktopUtils';
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReduxStore } from 'redux_config/reducers';
import loginActions from '../redux/actions';
import LoginComponent from './LoginComponent';

const Login = () => {
    useDocumentTitle('Blazing KRaft - Login');

    // Map State To Props
    const { isLoginPending, properties } = useSelector((store: ReduxStore) => {
        return {
            properties: store.settingsReducer.properties,
            isLoginPending: store.loginReducer.isLoginPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();

    const [searchParams] = useSearchParams({});
    const navigate = useNavigate();

    const [getIsFirstApplicationUsage, setIsFirstApplicationUsage] =
        useCommonLocalStorage({
            key: 'Is First Application Usage',
        });
    const [getOidcProviderStorage, setOidcProviderStorage] =
        useCommonLocalStorage({
            key: 'oidc-provider',
        });
    const redirectPath = searchParams.get('redirectPath') || '/';

    const login = (email, password) =>
        dispatch(loginActions.login(email, password)).then(() => {
            setIsFirstApplicationUsage('false');
            setOidcProviderStorage('blazingkraft');
            navigate(redirectPath);
        });

    useEffect(() => {
        setOidcProviderStorage(null);
        if (CommonDesktopUtils.isDesktop()) {
            login('admin', 'admin');
        }
    }, []);

    return (
        <LoginComponent
            isLoginPending={isLoginPending}
            properties={properties}
            login={login}
        />
    );
};

export default Login;
