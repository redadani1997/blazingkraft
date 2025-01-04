import { AuthorizationUtils } from 'common/utils/AuthorizationUtils';
import { CommonValidationUtils } from 'common/utils/CommonValidationUtils';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { ReduxStore } from 'redux_config/reducers';
import { RequiredPermission } from '..';

interface UseAuthorizationProps {
    requiredPermissions: RequiredPermission[];
    customCode?: string;
}

function useAuthorization({
    requiredPermissions,
    customCode,
}: UseAuthorizationProps): {
    isAuthorized: boolean;
} {
    const { clusterCode, schemaRegistryCode, kafkaConnectCode, ksqlDbCode } =
        useParams();

    const { serverPermissions, userPermissions, isBlazingAdmin } = useSelector(
        (state: ReduxStore) => ({
            serverPermissions: state.settingsReducer.serverPermissions,
            userPermissions: state.settingsReducer.userPermissions,
            isBlazingAdmin: state.settingsReducer.isBlazingAdmin,
        }),
        shallowEqual,
    );

    const isAuthorized = CommonValidationUtils.isFalsy(customCode)
        ? AuthorizationUtils.isAuthorized({
              requiredPermissions,
              serverPermissions,
              userPermissions,
              isBlazingAdmin,
              clusterCode,
              kafkaConnectCode,
              schemaRegistryCode,
              ksqlDbCode,
          })
        : AuthorizationUtils.isAuthorized({
              requiredPermissions,
              serverPermissions,
              userPermissions,
              isBlazingAdmin,
              clusterCode: customCode,
              kafkaConnectCode: customCode,
              schemaRegistryCode: customCode,
              ksqlDbCode: customCode,
          });

    return { isAuthorized };
}

export default useAuthorization;
