/**
 * GitHub Users
 */

export type FoundUserType = {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User';
  site_admin: boolean;
  score: number;
};

export type UserDetailsType = {
  id: number;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User';
  site_admin: false;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type UsersType = {
  id: number;
  login: string;
  avatarUrl: string;
  email: string;
  publicRepos: number;
  followers: number;
  following: number;
  bio: string;
  location: string;
  createdAt: string;
  reposUrl: string;
};

export type UsersListType = Array<UsersType>;

export type UsersState = {
  loading: boolean;
  usersList: UsersListType;
};
