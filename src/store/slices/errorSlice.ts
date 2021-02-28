import { createSlice } from '@reduxjs/toolkit';
import { searchUsers, searchUsersRepos } from '../thunks/searchUsersThunk';

export type ErrorState = {
  errorMessage: string;
  showError: boolean;
};

const initialState: ErrorState = {
  errorMessage: '',
  showError: false,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    clearError: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => initialState);
    builder.addCase(searchUsers.rejected, (state, { payload }) => {
      state.showError = true;
      state.errorMessage = (payload as string) ?? 'Something went wrong.';
    });
    builder.addCase(searchUsersRepos.pending, (state) => initialState);
    builder.addCase(searchUsersRepos.rejected, (state, { payload }) => {
      state.showError = true;
      state.errorMessage = (payload as string) ?? 'Something went wrong.';
    });
  },
});

export const { clearError } = errorSlice.actions;

export default errorSlice.reducer;
