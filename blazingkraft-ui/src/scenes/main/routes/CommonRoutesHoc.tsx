import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import useLogin from 'scenes/login/hooks/useLogin';
import { ActiveLink } from '../navbar';
import routeActions from '../navbar/redux/actions';
import CommonShell from '../shell/CommonShell';

interface CommonRoutesHocProps {
    children: any;
    activeLink: ActiveLink;
}

function getCode(
    clusterCode,
    schemaRegistryCode,
    kafkaConnectCode,
    ksqlDbCode,
) {
    return [clusterCode, schemaRegistryCode, kafkaConnectCode, ksqlDbCode].find(
        ele => ele !== undefined,
    );
}

const CommonRoutesHoc = ({ children, activeLink }: CommonRoutesHocProps) => {
    const { isConnected } = useLogin();
    const location = useLocation();
    const params = useParams();
    const { clusterCode, schemaRegistryCode, kafkaConnectCode, ksqlDbCode } =
        params;
    const code = getCode(
        clusterCode,
        schemaRegistryCode,
        kafkaConnectCode,
        ksqlDbCode,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            routeActions.setActiveLink({
                ...activeLink,
                code,
            }),
        );
    }, [location, code]);

    return isConnected ? (
        <CommonShell>
            <div
                key={location.pathname}
                className="w-full h-full flex flex-col"
            >
                {children}
            </div>
        </CommonShell>
    ) : (
        <></>
    );
};

export default CommonRoutesHoc;
