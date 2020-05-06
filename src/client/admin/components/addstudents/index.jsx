import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { asyncAddStudentInfo } from '../../store/middleware/asyncAddStudent';

const Addstudents = (props) => {
  // eslint-disable-next-line prefer-destructuring
  const classes = props.classes;
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const token = window.localStorage.getItem('polyAdmin');

  const createAccount = (event) => {
    event.preventDefault();
    props.asyncAddStudentInfo(token, login, password);
    console.log(login);
    console.log(password);
  };

  return (
    <div className='Students-Add'>
      <h2>Заполните Форму</h2>
      <div className='Students-Input'>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Логин'
                name='lastName'
                autoComplete='lname'
                value={login}
                onChange={(event) => { setLogin(event.target.value); }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Пароль'
                autoFocus
                value={password}
                onChange={(event) => { setPassword(event.target.value); }}
              />
            </Grid>

          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={createAccount}
          >
            Создать
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  asyncAddStudentInfo: (token, login, password) => {
    dispatch(asyncAddStudentInfo(token, login, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Addstudents);
