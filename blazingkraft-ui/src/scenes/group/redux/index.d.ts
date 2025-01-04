import { GroupDetails, GroupMeta } from 'common/types/group';

export type GroupReducerState = {
    groupDetails: GroupDetails;
    groups: GroupMeta[];
    isGetGroupDetailsPending: boolean;
    isGetAllGroupsPending: boolean;
    isCreateGroupPending: boolean;
    isEditGroupPending: boolean;
    isDeleteGroupPending: boolean;
};
