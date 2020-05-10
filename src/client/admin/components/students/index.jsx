import React, { useEffect } from 'react';
import './students.pcss';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Addstudents from '../addstudents';
import Editstudents from '../editstudents';
import { setPageMode } from '../../store/reducers/studentsPageReducer';
import { asyncGetGroups, asyncGetGroupInfo } from '../../store/middleware/asyncGetGroups';
import { Editgroupcontainer } from '../../hoc/editgroupscontainer';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    padding: theme.spacing(1),
  },
  buttonWrap: {
    width: '100%',
    textAlign: 'center',
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
    maxWidth: '350px',
  },
}));

const Students = (props) => {
  props.setSelectedIndex(1);
  const classes = useStyles();

  const addStudentMode = (event) => {
    props.setPageMode(<Addstudents classes={classes} />, 1);
  };

  const token = window.localStorage.getItem('polyAdmin');
  const editStudentMode = (event) => {
    props.asyncGetGroups(token);
    props.setPageMode(Editgroupcontainer(Editstudents), 2);
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
  asyncGetGroups: (token) => {
    dispatch(asyncGetGroups(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
