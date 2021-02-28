import React, { FC } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Routes from './Routes';
import { clearError } from './store/slices/errorSlice';
import { RootState } from './store/store';

const App: FC<{ history: History }> = ({ history }): JSX.Element => {
  const { error } = useSelector((store: RootState) => store);
  const dispatch = useDispatch();
  const { errorMessage, showError } = error;

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <ConnectedRouter history={history}>
      <Header />
      <Routes />
      <Snackbar autoHideDuration={6000} open={showError} onClose={handleClose}>
        <Alert variant="filled" severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </ConnectedRouter>
  );
};

export default App;
