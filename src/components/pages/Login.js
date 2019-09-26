import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/LockOutlined';

import useForm from '../../hooks/useForm';
import Header from '../commons/Header';

const stateSchema = {
  email: { value: '', error: '' },
  password: { value: '', error: '' },
};

const validationSchema = {
  email: {
    required: true,
  },
  password: {
    required: true,
  },
};

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { state, handleChange, handleSubmit } = useForm(stateSchema, validationSchema, () => {});
  const { email, password } = state;

  return (
    <Container maxWidth="xs">
      <Header
        icon={LockIcon}
        title="Login"
        gutter
      />

      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email.value}
          helperText={email.error}
          error={!!email.error}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password.value}
          helperText={password.error}
          error={!!password.error}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
      </form>

    </Container>
  );
};

Login.propTypes = {};

export default Login;
