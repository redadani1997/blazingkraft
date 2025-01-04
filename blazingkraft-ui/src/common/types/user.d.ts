export interface UserMeta {
    email: string;
    firstName: string;
    lastName: string;
    groupCode: string;
    groupName: string;
}

export interface UserDetails {
    email: string;
    firstName: string;
    lastName: string;
    groupCode: string;
    groupName: string;
    createdBy: string;
    creationTime: number;
    updatedBy: string;
    updateTime: number;
}
