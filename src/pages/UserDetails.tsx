import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Fallback from '../components/Fallback';
import useDebounce from '../helpers/useDebounce';
import { UsersReposListType } from '../store/slices/usersReposSliceTypes';
import { searchUsers, searchUsersRepos } from '../store/thunks/searchUsersThunk';
import useStyles from '../styles';
import { RootState } from '../store/store';

const UserDetails: FC = (): JSX.Element => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const { users, usersRepos } = useSelector((store: RootState) => store);
  const dispatch = useDispatch();

  const [searchRepo, setSearchRepo] = useState<string>('');
  const [filteredRepos, setFilteredRepos] = useState<UsersReposListType>([]);
  const debouncedValue = useDebounce<string>(searchRepo, 600);

  const { loading, usersReposList } = usersRepos;
  const { usersList } = users;

  const user = useMemo(() => {
    return usersList.find((u) => u.login === id);
  }, [id, usersList]);

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const input = e.target.value.toLowerCase();
    setSearchRepo(input);
    if (input === '') setFilteredRepos(usersReposList);
  };

  const clearInput = (): void => {
    batch(() => {
      setSearchRepo('');
      setFilteredRepos(usersReposList);
    });
  };

  useEffect(() => {
    if (debouncedValue !== '') {
      const filteredArr = usersReposList.filter((r) => r.name.toLowerCase().includes(debouncedValue));
      setFilteredRepos(filteredArr);
    }
  }, [debouncedValue, usersReposList]);

  useEffect(() => {
    if (!users.usersList.length) dispatch(searchUsers(id));
  }, [dispatch, id, users.usersList.length]);

  useEffect(() => {
    dispatch(searchUsersRepos(id));
  }, [dispatch, id]);

  useEffect(() => {
    setFilteredRepos(usersReposList);
  }, [usersReposList]);

  return (
    <>
      <Box display="flex" justifyContent="center" mb={3}>
        <Paper variant="outlined" className={classes.reposPaper}>
          <Avatar alt="user_avatar" src={user?.avatarUrl} className={classes.bigAvatar} />
          <Box>
            <Box display="flex" className={classes.propsWrapper}>
              <Typography className={classes.userKeys}>User Name:</Typography>
              <Typography className={classes.userValues}>{user?.login ?? '✘'}</Typography>
            </Box>
            <Box display="flex" className={classes.propsWrapper}>
              <Typography className={classes.userKeys}>Email:</Typography>
              <Typography className={classes.userValues}>{user?.email ?? '✘'}</Typography>
            </Box>
            <Box display="flex" className={classes.propsWrapper}>
              <Typography className={classes.userKeys}>Location:</Typography>
              <Typography className={classes.userValues}>{user?.location ?? '✘'}</Typography>
            </Box>
            <Box display="flex" className={classes.propsWrapper}>
              <Typography className={classes.userKeys}>Join Date:</Typography>
              <Typography className={classes.userValues}>
                {user ? new Date(user.createdAt).toDateString() : '✘'}
              </Typography>
            </Box>
            <Box display="flex" className={classes.propsWrapper}>
              <Typography className={classes.userKeys}>Followers:</Typography>
              <Typography className={classes.userValues}>{user?.followers ?? '✘'}</Typography>
            </Box>
            <Box display="flex" className={classes.propsWrapper}>
              <Typography className={classes.userKeys}>Following:</Typography>
              <Typography className={classes.userValues}>{user?.following ?? '✘'}</Typography>
            </Box>
          </Box>
          <Box>
            <TextField
              label="Biography"
              aria-readonly
              inputProps={{ readOnly: true }}
              variant="standard"
              multiline
              rows={8}
              value={user?.bio === null ? '' : user?.bio}
            />
          </Box>
        </Paper>
      </Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <FormControl className={classes.searchInput}>
          <InputLabel htmlFor="search-user">Search for User&apos;s Repositories</InputLabel>
          <Input
            id="search-users-repos"
            type="text"
            value={searchRepo}
            onChange={(e) => onInputChange(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search-for-users-repos"
                  size="small"
                  className={classes.clearButton}
                  onClick={clearInput}
                >
                  <HighlightOffIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
      {loading ? (
        <Fallback />
      ) : filteredRepos.length ? (
        <Paper variant="outlined" className={classes.reposList}>
          {filteredRepos.map((r) => {
            return (
              <Card key={r.id} className={classes.card} elevation={4}>
                <Link key={r.id} href={r.htmlUrl} target="_blank" underline="none" className={classes.repoLink}>
                  <CardContent className={classes.cardContent}>
                    <Box>
                      <Typography variant="h6" component="h6">
                        {r.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Box display="flex">
                        <Typography className={classes.userValues}>{r.forksCount ?? '✘'}</Typography>
                        <Typography className={classes.userKeys}>Forks</Typography>
                      </Box>
                      <Box display="flex">
                        <Typography className={classes.userValues}>{r.stargazersCount ?? '✘'}</Typography>
                        <Typography className={classes.userKeys}>Stars</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </Paper>
      ) : null}
    </>
  );
};

export default UserDetails;
