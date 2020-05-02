import React, { useState } from 'react';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { asyncAuth } from '../../store/middleware/asyncGetAdmin';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Main = (props) => {
  const classes = useStyles();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const authorize = (event) => {
    event.preventDefault();
    props.asyncAuth(login, password);
    setLogin('');
    setPassword('');
  };

  return (
    <div className='Main' >
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Авторизация
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='login'
              label='Логин'
              name='login'
              autoFocus
              onChange={(event) => { setLogin(event.target.value); }}
              value={login}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Пароль'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={(event) => { setPassword(event.target.value); }}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Запомнить меня'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={authorize}
            >
              Вход
          </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  asyncAuth: (login, password) => {
    dispatch(asyncAuth(login, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
