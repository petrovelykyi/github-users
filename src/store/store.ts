import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import createRootReducer from './rootReducer';

export const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });
const rootReducer = createRootReducer(history);
export type RootState = ReturnType<typeof rootReducer>;

const router = routerMiddleware(history);
const middleware = [...getDefaultMiddleware(), router];

if (process.env.NODE_ENV === 'development') {
  const reduxLogger = createLogger({
    level: 'info',
    collapsed: true,
  });
  middleware.push(reduxLogger);
}

const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: rootReducer,
  middleware,
});

export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
