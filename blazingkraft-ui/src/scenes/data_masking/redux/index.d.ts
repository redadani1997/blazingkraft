export interface IDataMasking {
    name: string;
    code: string;
    dataMaskingType: string;
    rule: string;
    ruleType: string;
    result: string;
    topicType: string;
    topic: string;
}

export type DataMaskingReducerState = {
    isCreateDataMaskingPending: boolean;
    isDeleteDataMaskingPending: boolean;
    isEditDataMaskingPending: boolean;
    isGetAllDataMaskingsPending: boolean;
    dataMaskings: IDataMasking[];
};
