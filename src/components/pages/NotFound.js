import React from 'react';
import { paths } from '../../config';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    alignSelf: 'center',
    textTransform: 'none',
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography variant="h2" align="center">
        404
      </Typography>
      <Typography variant="body1" align="center">
        PAGE NOT FOUND
      </Typography>
      <Button
        className={classes.button}
        component={Link}
        to={paths.DASHBOARD_PAGE}
      >
        Back to Dashboard
      </Button>
    </Container>
  );
};

export default NotFound;
