import middlewares from './middlewares';
import reducers, { ReduxStore } from './reducers';

import { configureStore, Middleware } from '@reduxjs/toolkit';
import { ReduxAction } from '.';

const store = configureStore<
    ReduxStore,
    ReduxAction,
    ReadonlyArray<Middleware<{}, ReduxStore>>
>({
    reducer: reducers,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([...middlewares]),
});

export default store;
