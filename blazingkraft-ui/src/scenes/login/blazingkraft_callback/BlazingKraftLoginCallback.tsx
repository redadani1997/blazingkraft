import { CommonDesktopUtils } from 'common/utils/CommonDesktopUtils';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ReduxStore } from 'redux_config/reducers';
import loginActions from '../redux/actions';
import BlazingKraftLoginCallbackComponent from './BlazingKraftLoginCallbackComponent';

const BlazingKraftLoginCallback = () => {
    // Map State To Props
    const { isRefreshTokenPending } = useSelector((store: ReduxStore) => {
        return {
            isRefreshTokenPending: store.loginReducer.isRefreshTokenPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    const dispatch = useDispatch<any>();
    const [searchParams] = useSearchParams({});
    const navigate = useNavigate();
    const redirectPath = searchParams.get('redirectPath') || '/';

    const blazingkraftRefreshToken = () => {
        if (CommonDesktopUtils.isWeb()) {
            return dispatch(loginActions.blazingkraftRefreshToken())
                .then(() => {
                    navigate(redirectPath);
                })
                .catch(() => {
                    navigate(`/login?redirectPath=${redirectPath}`);
                });
        } else {
            navigate(`/login?redirectPath=${redirectPath}`);
        }
    };

    return (
        <>
            <BlazingKraftLoginCallbackComponent
                blazingkraftRefreshToken={blazingkraftRefreshToken}
                isRefreshTokenPending={isRefreshTokenPending}
            />
        </>
    );
};

export default BlazingKraftLoginCallback;
