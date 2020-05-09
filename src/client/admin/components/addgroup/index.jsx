import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    justifyContent: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Addgroup = (props) => {
  // eslint-disable-next-line prefer-destructuring
  const classes = useStyles();
  const [group, setGroup] = React.useState('');
  const token = window.localStorage.getItem('polyAdmin');

  const createGroup = (event) => {
    event.preventDefault();
    console.log(group);
    props.asyncAddStudentInfo(token, group);
    setGroup('');
  };

  return (
    <div className='Students-Add'>
      <h2>Введите номер группы</h2>
      <div className='Students-Input'>
        <form className={classes.root} noValidate autoComplete='off' onSubmit={(event) => { event.preventDefault(); }}>
          <TextField id='outlined-basic'
            label='Группа'
            variant='outlined'
            value={group}
            onChange={(event) => { setGroup(event.target.value); }}
          />
          <Button
            variant='contained'
            size='large'
            color='primary'
            type='submit'
            className={classes.margin}
            onClick={createGroup}
          >
            Добавить
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Addgroup);
