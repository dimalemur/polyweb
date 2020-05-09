import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { Groupstudentlist } from '../groupstudentlist';
import { asyncGetGroupInfo } from '../../store/middleware/asyncGetGroups';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '3em',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  button: {
    margin: theme.spacing(1),
    height: '55%%',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  fab: {
    margin: theme.spacing(2),
  },
  fabWrap: {
    width: '100%',
    justifyContent: 'center',
  },

}));

const Groupinput = (props) => {
  const [group, setGroup] = React.useState(null);
  const token = window.localStorage.getItem('polyAdmin');
  const handleChangeGroup = (event) => {
    event.preventDefault();
    props.asyncGetGroupInfo(token, group.title);
  };

  return (
    <div className='Groups-Input'>
      <form action='submit' className={props.classes.root} onSubmit={(event) => { event.preventDefault(); }}>
        <Autocomplete
          className={props.classes.input}
          id='combo-box-demo'
          options={props.groups.map((element) => ({ title: element.group_number }))}
          getOptionLabel={(option) => option.title}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Группа' variant='outlined' />}
          onChange={(event, value, reason) => { setGroup(value); }}
          getOptionSelected={(option, value) => true}
        />

        <IconButton type='submit' className={props.classes.iconButton} aria-label='search' onClick={handleChangeGroup}>
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  );
};

const Editgroups = (props) => {
  const token = window.localStorage.getItem('polyAdmin');
  const classes = useStyles();

  return (
    <div className='Students-Add'>
      <h2>Введите номер группы</h2>
      <Groupinput classes={classes} token={token} groups={props.groups} asyncGetGroupInfo={props.asyncGetGroupInfo} />

      <Groupstudentlist groupData={props.groupData}
        asyncDeleteStudentFromGroup={props.asyncDeleteStudentFromGroup}
        asyncAddStudentFromGroup={props.asyncAddStudentFromGroup}
        token={token}
        asyncGetGroupInfo={props.asyncGetGroupInfo}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
  groups: state.groupsPage.groups,
  groupData: state.groupsPage.groupData,
});
const mapDispatchToProps = (dispatch) => ({
  asyncGetGroupInfo: (token, group) => {
    dispatch(asyncGetGroupInfo(token, group));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editgroups);
