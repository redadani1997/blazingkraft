import { GroupPermissions } from 'common/permissions/management/GroupPermissions';
import { shallowEqual, useSelector } from 'react-redux';
import { ReduxStore } from 'redux_config/reducers';
import useAuthorization from 'scenes/common/authorization/hook/useAuthorization';
import AllGroupsHeaderComponent from './AllGroupsHeaderComponent';

interface AllGroupsHeaderProps {
    refreshPageContent: () => void;
}

const AllGroupsHeader = ({ refreshPageContent }: AllGroupsHeaderProps) => {
    // Map State To Props
    const { isGetAllGroupsPending, groups } = useSelector(
        (store: ReduxStore) => {
            return {
                isGetAllGroupsPending: store.groupReducer.isGetAllGroupsPending,
                groups: store.groupReducer.groups,
            };
        },
        shallowEqual,
    );
    // Map Dispatch To Props

    const { isAuthorized: isAuthorizedCreateGroup } = useAuthorization({
        requiredPermissions: [
            {
                authorizationType: 'MANAGEMENT',
                permission: GroupPermissions.GROUP_PERMISSIONS.CREATE_GROUP,
            },
        ],
    });

    return (
        <AllGroupsHeaderComponent
            refreshPageContent={refreshPageContent}
            isRefreshPageContentPending={isGetAllGroupsPending}
            groupsLength={groups.length}
            isAuthorizedCreateGroup={isAuthorizedCreateGroup}
        />
    );
};

export default AllGroupsHeader;
