import React, { FC } from 'react';
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import useStyles from '../styles';

const Header: FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed">
        <Container>
          <Toolbar id="tool-bar" disableGutters className={classes.toolBar}>
            <Typography variant="h6">
              <NavLink to="/" className={classes.btnLink}>
                GitHub Searcher
              </NavLink>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
