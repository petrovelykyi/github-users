import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import routes from './routes.json';
import useStyles from './styles';

const Routes: FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Switch>
        <Route exact path={routes.SEARCH_USER} component={Home} />
        <Route exact path={`${routes.USER_DETAILS}/:id`} component={UserDetails} />
      </Switch>
    </Container>
  );
};

export default Routes;
