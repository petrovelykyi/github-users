import { CombinedState, combineReducers, Reducer } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import usersReducer from './slices/usersSlice';
import usersReposReducer from './slices/usersReposSlice';
import errorReducer, { ErrorState } from './slices/errorSlice';
import { UsersState } from './slices/usersSliceTypes';
import { UsersReposState } from './slices/usersReposSliceTypes';

export default function createRootReducer(
  history: History,
): Reducer<
  CombinedState<{
    router: RouterState;
    users: UsersState;
    usersRepos: UsersReposState;
    error: ErrorState;
  }>
> {
  return combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    usersRepos: usersReposReducer,
    error: errorReducer,
  });
}
