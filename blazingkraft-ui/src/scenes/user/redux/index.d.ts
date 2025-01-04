import { UserDetails, UserMeta } from 'common/types/user';

export type UserReducerState = {
    isCreateUserPending: boolean;
    isGetAllUsersPending: boolean;
    isDeleteUserPending: boolean;
    isEditUserPending: boolean;
    isEditUserPasswordPending: boolean;
    isEditUserPasswordWithoutCurrentPending: boolean;
    isGetUserDetailsPending: boolean;
    users: UserMeta[];
    userDetails: UserDetails | null;
};
