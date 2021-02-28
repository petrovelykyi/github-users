import { createSlice } from '@reduxjs/toolkit';
import { searchUsers } from '../thunks/searchUsersThunk';
import { UsersState } from './usersSliceTypes';

const initialState: UsersState = {
  loading: false,
  usersList: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.usersList = payload;
    });
    builder.addCase(searchUsers.rejected, (state, { payload }) => {
      state.loading = false;
    });
  },
});

export const { clearUsers } = usersSlice.actions;

export default usersSlice.reducer;
