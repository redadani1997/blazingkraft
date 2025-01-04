let CONCURRENT_ACTION_ID = 1;
const CONCURRENT_ACTION_ID_BY_ACTION = new Map<string, number>();

function concurrentActionsMiddleware() {
    return next => action => {
        const { type, meta }: { type: string; meta: any; payload: any } =
            action;

        const concurrencyIdentifier = meta?.concurrencyIdentifier;

        const isPending = type.endsWith('_PENDING');
        const isFulfilled = type.endsWith('_FULFILLED');
        const isRejected = type.endsWith('_REJECTED');
        const isBase = !isPending && !isFulfilled && !isRejected;

        const expectedActionId = action.meta?.__concurrentActionId;

        if (isBase) {
            const actionId = CONCURRENT_ACTION_ID++;
            const computedType = concurrencyIdentifier
                ? `${type}____${concurrencyIdentifier}`
                : type;
            CONCURRENT_ACTION_ID_BY_ACTION.set(computedType, actionId);
            const newAction = {
                ...action,
                meta: {
                    ...(meta || {}),
                    __concurrentActionId: actionId,
                },
            };
            return next(newAction);
        }
        if (isFulfilled || isRejected) {
            const actionType = isFulfilled
                ? type.slice(0, -10)
                : type.slice(0, -9);
            const computedType = concurrencyIdentifier
                ? `${actionType}____${concurrencyIdentifier}`
                : actionType;
            const actionId = CONCURRENT_ACTION_ID_BY_ACTION.get(computedType);
            if (actionId && expectedActionId && actionId === expectedActionId) {
                CONCURRENT_ACTION_ID_BY_ACTION.delete(computedType);
                return next(action);
            }
            // TODO: Safety net
            // else {
            //     return next(action);
            // }
        } else {
            return next(action);
        }
    };
}

export default concurrentActionsMiddleware;
