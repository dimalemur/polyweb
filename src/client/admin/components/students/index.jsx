import React, { useEffect } from 'react';
import './students.pcss';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import NavigationIcon from '@material-ui/icons/Navigation';
import EditIcon from '@material-ui/icons/Edit';
import Select from 'react-select';
import { Addstudents } from '../addstudents';
import Editstudents from '../editstudents';
import { setPageMode } from '../../store/reducers/studentsPageReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    padding: theme.spacing(1),
  },
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Students = (props) => {
  props.setSelectedIndex(1);
  const classes = useStyles();

  const addStudentMode = (event) => {
    props.setPageMode(<Addstudents classes={classes} />, 1);
  };

  const editStudentMode = (event) => {
    props.setPageMode(<Editstudents />, 2);
  };

  return (
    <div className='Students'>

      <div className='Changemode Students-Changemode'>

        <Button
          variant='contained'
          color={(props.mode === 1) ? 'secondary' : 'primary'}
          className={`${classes.button} 'Changemode-Add'`}
          startIcon={<AddIcon />}
          onClick={addStudentMode}
        >
          Добавить студента
      </Button>

        <Button
          variant='contained'
          color={(props.mode === 2) ? 'secondary' : 'primary'}
          className={`${classes.button} 'Changemode-Add'`}
          startIcon={<EditIcon />}
          onClick={editStudentMode}
        >
          Редактировать запись студента
        </Button>

      </div>

      {props.pageModeComponent}

    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
  login: state.mainAdminPage.user.login,
  pageModeComponent: state.studentPage.pageModeComponent,
  mode: state.studentPage.mode,
});

const mapDispatchToProps = (dispatch) => ({
  setPageMode: (component, mode) => {
    dispatch(setPageMode(component, mode));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
