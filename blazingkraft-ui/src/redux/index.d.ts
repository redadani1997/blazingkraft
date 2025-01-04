import { AnyAction } from 'redux';

export interface ReduxAction extends AnyAction {
    payload?: any;
    meta?: any;
    error?: any;
}
