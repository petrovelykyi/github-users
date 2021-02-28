import React, { FC, ChangeEvent, MouseEvent, useState, useEffect } from 'react';
import { push } from 'connected-react-router';
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
  Paper,
  Typography,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useDispatch, useSelector } from 'react-redux';
import Fallback from '../components/Fallback';
import routes from '../routes.json';
import useDebounce from '../helpers/useDebounce';
import { clearUsers } from '../store/slices/usersSlice';
import { searchUsers } from '../store/thunks/searchUsersThunk';
import useStyles from '../styles';
import { RootState } from '../store/store';

const Home: FC = (): JSX.Element => {
  const classes = useStyles();

  const { users } = useSelector((store: RootState) => store);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string>('');
  const debouncedValue = useDebounce<string>(userName, 600);

  const { loading, usersList } = users;

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    setUserName(e.target.value);
  };

  const clearInput = (): void => {
    if (userName) setUserName('');
    if (usersList.length) dispatch(clearUsers());
  };

  const onCardClick = (_e: MouseEvent, id: string): void => {
    dispatch(push(`${routes.USER_DETAILS}/${id}`));
  };

  useEffect(() => {
    if (debouncedValue !== '') {
      dispatch(searchUsers(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  return (
    <>
      <Box display="flex" justifyContent="center" mb={3}>
        <FormControl className={classes.searchInput}>
          <InputLabel htmlFor="search-user">Search for Users</InputLabel>
          <Input
            id="search-user"
            type="text"
            value={userName}
            onChange={(e) => onInputChange(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search-for-users"
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
      ) : usersList.length ? (
        <Paper variant="outlined" className={classes.usersList}>
          {usersList.map((u) => {
            return (
              <Card key={u.id} className={classes.card} elevation={4} onClick={(e) => onCardClick(e, u.login)}>
                <CardContent className={classes.cardContent}>
                  <Avatar alt="user_avatar" src={u.avatarUrl} className={classes.smallAvatar} />
                  <Typography variant="h6" component="h6">
                    {u.login}
                  </Typography>
                  <Typography variant="subtitle1">Repo: {u.publicRepos}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Paper>
      ) : null}
    </>
  );
};

export default Home;
