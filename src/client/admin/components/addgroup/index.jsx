import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputl: {
    zIndex: '2',
  },
}));

const semesters = ['1', '2', '3', '4', '5', ' 6', '7', '8', '9', '10', '11', '12'];

const Addgroup = (props) => {
  // eslint-disable-next-line prefer-destructuring
  const classes = useStyles();
  const [group, setGroup] = React.useState('');
  const [semester, setSemester] = React.useState('');
  const token = window.localStorage.getItem('polyAdmin');

  const createGroup = (event) => {
    event.preventDefault();
    console.log(group);
    props.asyncAddStudentInfo(token, group, semester);
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

          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel htmlFor='outlined-age-native-simple'>Age</InputLabel>
            <Select
              native
              label='Семестр'
              onChange={(event) => { setSemester(event.target.value); }}
              inputProps={{
                name: 'semester',
                id: 'outlined-age-native-simple',
              }}
            >
              {semesters.map((sem) => (<option key={sem} value={sem}>{sem}</option>))}
            </Select>
          </FormControl>

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
