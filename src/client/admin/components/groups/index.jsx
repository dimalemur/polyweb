import React from 'react';
import './groups.pcss';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Editgroups from '../editgroups';
import Addgroup from '../addgroup';
import { setPageMode } from '../../store/reducers/groupsPageReducer';
import { asyncGetGroups } from '../../store/middleware/asyncGetGroups';
import { Creategroupcontainer } from '../../hoc/creategroupcontainer';
import { Editgroupcontainer } from '../../hoc/editgroupscontainer';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
}));

const Gruops = (props) => {
  const token = window.localStorage.getItem('polyAdmin');

  const classes = useStyles();
  props.setSelectedIndex(0);

  const handleChangeGroup = (event) => {
    console.log(event.value);
  };

  const addGroupMode = (event) => {
    props.setPageMode(1);
  };

  const editGroupMode = (event) => {
    props.asyncGetGroups(token);
    props.setPageMode(2);
  };

  const componentByMode = (mode) => {
    switch (mode) {
      case 2:
        return Editgroupcontainer(Editgroups);
      case 1:
        return Creategroupcontainer(Addgroup);
      default:
        return '';
    }
  };

  return (
    <div className='Groups'>
      <div className='Changemode Groups-Changemode'>

        <Button
          variant='contained'
          color={(props.mode === 1) ? 'secondary' : 'primary'}
          className={`${classes.button} 'Changemode-Add'`}
          startIcon={<AddIcon />}
          onClick={addGroupMode}
        >
          Добавить группу
      </Button>

        <Button
          variant='contained'
          color={(props.mode === 2) ? 'secondary' : 'primary'}
          className={`${classes.button} 'Changemode-Add'`}
          startIcon={<EditIcon />}
          onClick={editGroupMode}
        >
          Редактировать группу
        </Button>

      </div>

      {componentByMode(props.mode)}

    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
  login: state.mainAdminPage.user.login,
  mode: state.groupsPage.mode,
});

const mapDispatchToProps = (dispatch) => ({
  setPageMode: (mode) => {
    dispatch(setPageMode(mode));
  },
  asyncGetGroups: (token) => {
    dispatch(asyncGetGroups(token));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Gruops);
