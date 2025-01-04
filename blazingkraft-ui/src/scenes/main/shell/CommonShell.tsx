import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import LoadingSpinner from 'scenes/common/loading/LoadingSpinner';
import settingsActions from 'scenes/settings/redux/actions';
import CommonShellComponent from './CommonShellComponent';

interface CommonShellProps {
    children: React.ReactNode;
}
const CommonShell = (props: CommonShellProps) => {
    // Map State To Props
    const { isGetConfigurationPending } = useSelector((store: ReduxStore) => {
        return {
            isGetConfigurationPending:
                store.settingsReducer.isGetConfigurationPending,
        };
    }, shallowEqual);

    // Map Dispatch To Props
    // const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const getConfiguration = () => dispatch(settingsActions.getConfiguration());

    useEffect(() => {
        getConfiguration().catch(() => {
            navigate('/login');
        });
    }, []);

    if (isGetConfigurationPending) {
        return <LoadingSpinner isLoading={isGetConfigurationPending} />;
    }

    return (
        <>
            <CommonShellComponent {...props} />
        </>
    );
};

export default CommonShell;
