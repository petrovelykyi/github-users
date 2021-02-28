import React, { FC } from 'react';
import { Box, CircularProgress } from '@material-ui/core';
import useStyles from '../styles';

const Fallback: FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.fallback}>
      <CircularProgress size={64} />
    </Box>
  );
};

export default Fallback;
