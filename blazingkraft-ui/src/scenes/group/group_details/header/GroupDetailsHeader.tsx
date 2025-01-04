import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import GroupDetailsHeaderComponent from './GroupDetailsHeaderComponent';

interface GroupDetailsHeaderProps {
    refreshPageContent: () => void;
}

const GroupDetailsHeader = ({
    refreshPageContent,
}: GroupDetailsHeaderProps) => {
    // Map State To Props
    const { isGetGroupDetailsPending, groupDetails } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetGroupDetailsPending:
                    store.groupReducer.isGetGroupDetailsPending,
                groupDetails: store.groupReducer.groupDetails,
            };
        },
        shallowEqual,
    );

    // Map Dispatch To Props

    // Authorization
    const { isAuthorized: isAuthorizedDeleteGroup } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: GroupPermissions.GROUP_PERMISSIONS.DELETE_GROUP,
            },
        ],
    });
    const { isAuthorized: isAuthorizedEditGroup } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: GroupPermissions.GROUP_PERMISSIONS.EDIT_GROUP,
            },
        ],
    });

    return (
        <GroupDetailsHeaderComponent
            groupDetails={groupDetails}
            isRefreshPageContentPending={isGetGroupDetailsPending}
            refreshPageContent={refreshPageContent}
            isAuthorizedDeleteGroup={isAuthorizedDeleteGroup}
            isAuthorizedEditGroup={isAuthorizedEditGroup}
        />
    );
};

export default GroupDetailsHeader;
