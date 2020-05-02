import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

export const Addstudents = (props) => {
  // eslint-disable-next-line prefer-destructuring
  const classes = props.classes;
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
                label='Фамилия'
                name='lastName'
                autoComplete='lname'
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
                label='Имя'
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete='otch'
                name='otchestvo'
                variant='outlined'
                required
                fullWidth
                id='otchestvo'
                label='Отчество'
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email'
                name='email'
                autoComplete='email'
              />
            </Grid>

          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Создать
          </Button>
        </form>
      </div>
    </div>
  );
};
