import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fallback: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    toolBar: {
      display: 'flex',
      justifyContent: 'center',
    },
    btnLink: {
      color: theme.palette.grey.A100,
      borderColor: theme.palette.grey.A100,
      marginLeft: theme.spacing(0.5),
      padding: theme.spacing(1),
      transition: 'color 0.3s ease, border-color 0.3s ease',
      borderWidth: 2,
      borderStyle: 'solid',
      borderRadius: theme.shape.borderRadius,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.contrastText,
      },
    },
    container: {
      paddingTop: theme.spacing(3),
    },
    searchInput: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 320,
    },
    clearButton: {
      '&:hover': {
        color: theme.palette.secondary.dark,
      },
    },
    card: {
      width: '100%',
      marginBottom: theme.spacing(1),
      padding: theme.spacing(0),
      transition: 'transform 0.1s ease',
      '&:last-child': {
        marginBottom: 0,
      },
      '&:hover': {
        cursor: 'pointer',
        transform: 'scale(1.01)',
      },
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing(3),
    },
    smallAvatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    searchWrapper: {
      margin: theme.spacing(0.5),
      position: 'relative',
    },
    circularProgress: {
      color: green[500],
      position: 'absolute',
      top: 1,
      left: 1,
    },
    usersList: {
      padding: theme.spacing(2),
      overflow: 'auto',
      maxHeight: 'calc(100vh - 184px)',
    },
    reposPaper: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '75%',
      padding: theme.spacing(2),
    },
    bigAvatar: {
      width: theme.spacing(24),
      height: theme.spacing(24),
    },
    propsWrapper: {
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    userKeys: {
      width: '100px',
      color: theme.palette.text.secondary,
    },
    userValues: {
      marginRight: theme.spacing(0.5),
      color: theme.palette.text.primary,
    },
    userBio: {
      width: '200px',
    },
    repoLink: {
      color: theme.palette.text.primary,
      '&:hover': {
        // textDecoration: 'none',
        // color: theme.palette.primary.dark,
      },
    },
    reposList: {
      padding: theme.spacing(2),
      overflow: 'auto',
      maxHeight: 'calc(100vh - 434px)',
    },
  }),
);

export default useStyles;
