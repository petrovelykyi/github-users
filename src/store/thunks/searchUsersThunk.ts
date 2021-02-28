import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../axiosConfig/axiosConfig';
import { FoundUserType, UsersType, UserDetailsType } from '../slices/usersSliceTypes';
import { ReposType, UsersRepoType } from '../slices/usersReposSliceTypes';

export const searchUsers = createAsyncThunk('searchUsers', async (arg: string, { rejectWithValue }) => {
  try {
    const url = `/search/users?q=${arg}+in:login&order=asc`;
    const usersList = await axios.get(url);
    const userDetailsReqs = (usersList.data.items as Array<FoundUserType>).map((u) => {
      return axios.get(`/users/${u.login}`);
    });
    const userDetailsRes: AxiosResponse<UserDetailsType>[] = await axios.all(userDetailsReqs);
    const result: Array<UsersType> = (usersList.data.items as Array<FoundUserType>).map((u, i) => {
      const newItem = <UsersType>{};
      newItem.id = u.id;
      newItem.login = u.login;
      newItem.avatarUrl = u.avatar_url;
      newItem.email = userDetailsRes[i].data.email;
      newItem.publicRepos = userDetailsRes[i].data.public_repos;
      newItem.followers = userDetailsRes[i].data.followers;
      newItem.following = userDetailsRes[i].data.following;
      newItem.bio = userDetailsRes[i].data.bio;
      newItem.location = userDetailsRes[i].data.location;
      newItem.createdAt = userDetailsRes[i].data.created_at;
      newItem.reposUrl = userDetailsRes[i].data.repos_url;
      return newItem;
    });
    return result;
  } catch (err) {
    if (err.response) return rejectWithValue(err.response.data.message);
    return rejectWithValue(err.message);
  }
});

export const searchUsersRepos = createAsyncThunk('searchUsersRepos', async (arg: string, { rejectWithValue }) => {
  try {
    const url = `/users/${arg}/repos`;
    const usersReposList = await axios.get(url);
    const result: Array<ReposType> = (usersReposList.data as Array<UsersRepoType>).map((r) => {
      const newItem = <ReposType>{};
      newItem.login = r.owner.login;
      newItem.id = r.id;
      newItem.name = r.name;
      newItem.forksCount = r.forks_count;
      newItem.stargazersCount = r.stargazers_count;
      newItem.htmlUrl = r.html_url;
      return newItem;
    });
    return result;
  } catch (err) {
    if (err.response) return rejectWithValue(err.response.data.message);
    return rejectWithValue(err.message);
  }
});
