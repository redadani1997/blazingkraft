import { Middleware } from 'redux';
// import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';
import alertsMiddleware from './middlewares/alert/alertsMiddleware';
import concurrentActionsMiddleware from './middlewares/concurrent/concurrentActionsMiddleware';

const middlewares: Middleware[] = [
    concurrentActionsMiddleware,
    promise,
    alertsMiddleware,
];

// if (process.env.NODE_ENV !== 'production') {
//     const logger: Middleware = createLogger({
//         duration: true,
//         diff: true,
//         collapsed: true,
//     });
//     middlewares.push(logger);
// }

export default middlewares;
