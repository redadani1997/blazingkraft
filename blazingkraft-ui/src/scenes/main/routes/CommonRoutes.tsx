import { Navigate, Route, Routes } from 'react-router';
import NotFoundPage from 'scenes/404/NotFoundPage';
import Home from 'scenes/home/Home';
import BlazingKraftLoginCallback from 'scenes/login/blazingkraft_callback/BlazingKraftLoginCallback';
import LoginCallback from 'scenes/login/callback/LoginCallback';
import Login from 'scenes/login/connect/Login';
import CommonRoutesHoc from './CommonRoutesHoc';
import CommonClusterRoutes from './cluster/CommonClusterRoutes';
import CommonKafkaConnectRoutes from './kafka_connect/CommonKafkaConnectRoutes';
import CommonKsqlDbRoutes from './ksqldb/CommonKsqlDbRoutes';
import CommonManagementRoutes from './management/CommonManagementRoutes';
import CommonPlaygroundRoutes from './playground/CommonPlaygroundRoutes';
import CommonSchemaRegistryRoutes from './schema_registry/CommonSchemaRegistryRoutes';

const CommonRoutes = () => {
    return (
        <Routes>
            {/* HOME Route */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
                path="/home"
                element={
                    <CommonRoutesHoc activeLink={{ id: 'HOME' }}>
                        <Home />
                    </CommonRoutesHoc>
                }
            />

            {/* CLUSTER Routes */}
            {CommonClusterRoutes}

            {/* KAKFA CONNECT */}
            {CommonKafkaConnectRoutes}

            {/* SCHEMA REGISTRY */}
            {CommonSchemaRegistryRoutes}

            {/* MANAGEMENT */}
            {CommonManagementRoutes}

            {/* KSQLDB */}
            {CommonKsqlDbRoutes}

            {/* PLAYGROUND */}
            {CommonPlaygroundRoutes}

            {/* LOGIN */}
            <Route path="/login" element={<Login />} />
            <Route
                path="/login/callback/blazingkraft"
                element={<BlazingKraftLoginCallback />}
            />
            <Route
                path="/login/callback/:OIDCProviderCode"
                element={<LoginCallback />}
            />

            {/* NOTFOUND Routes */}
            <Route
                path="*"
                element={
                    <CommonRoutesHoc activeLink={{ id: 'NOT_FOUND' }}>
                        <NotFoundPage />
                    </CommonRoutesHoc>
                }
            />
        </Routes>
    );
};
export default CommonRoutes;
