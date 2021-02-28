import { createSlice } from '@reduxjs/toolkit';
import { searchUsersRepos } from '../thunks/searchUsersThunk';
import { UsersReposState } from './usersReposSliceTypes';

const initialState: UsersReposState = {
  loading: false,
  usersReposList: [],
};

const usersReposSlice = createSlice({
  name: 'usersRepos',
  initialState,
  reducers: {
    clearUsersRepos: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsersRepos.pending, (state) => {
      state.loading = true;
      state.usersReposList = [];
    });
    builder.addCase(searchUsersRepos.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.usersReposList = payload;
    });
    builder.addCase(searchUsersRepos.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export const { clearUsersRepos } = usersReposSlice.actions;

export default usersReposSlice.reducer;
