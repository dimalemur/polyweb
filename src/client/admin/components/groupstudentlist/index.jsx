import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Addstudenttogroupdialog } from '../addstudenttogroupdialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(2),
  },
  add: {
    textAlign: 'center',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Groupstudentalert = (props) => (
  <div>
    <Dialog
      open={props.openAlert}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
      keepMounted
    >
      <DialogTitle id='alert-dialog-slide-title'>Удалить запись?</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          При удалении студента удаляются все данные связанные с ним. Продолжить?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}
          color='primary'
        >
          Не согласен
        </Button>
        <Button onClick={
          (event) => {
            props.deleteStudent(props.token, props.name, props.surname, props.otchestvo, props.group);
            props.handleClose();
          }}
          color='primary'
        >
          Согласен
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

const GroupstudentlistItem = (props) => {
  const deleteStudent = async (token, name, surname, otchestvo, group) => {
    await props.asyncDeleteStudentFromGroup(token, name, surname, otchestvo, group);
    // const userData = await props.asyncGetStudentByFnameAndGroup(props.token, name, surname, otchestvo, group);
    // console.log(userData);

    // const [userId, _id] = userData;
    // await props.asyncEditStudentData(props.token, _id, userId, { group: '' });
    await props.asyncGetGroupInfo(token, group);
  };
  return (
    <ListItem >
      <Groupstudentalert
        openAlert={props.openAlert}
        handleClose={props.handleClose}
        setAgree={props.setAgree}
        deleteStudent={deleteStudent}
        token={props.token}
        name={props.name}
        surname={props.surname}
        otchestvo={props.otchestvo}
        group={props.group}
      />
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${props.name} ${props.surname} ${props.otchestvo}`} />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='delete' onClick={props.handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>

    </ListItem>
  );
};

export const Groupstudentlist = (props) => {
  const classes = useStyles();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openDialogForm, setOpenDialogForm] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialogForm(true);
  };

  const handleCloseDialog = () => {
    setOpenDialogForm(false);
  };

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  if (props.groupData.groupStudents === undefined) {
    return '';
  }
  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.title}>
        {props.groupData.groupName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.demo}>
            <List>
              {
                props.groupData.groupStudents.map((element, i) => (
                  <GroupstudentlistItem
                    key={i}
                    token={props.token}
                    name={element.name}
                    surname={element.surname}
                    otchestvo={element.otchestvo}
                    group={props.groupData.groupName}
                    asyncEditStudentData={props.asyncEditStudentData}
                    asyncGetStudentByFnameAndGroup={props.asyncGetStudentByFnameAndGroup}
                    asyncDeleteStudentFromGroup={props.asyncDeleteStudentFromGroup}
                    asyncGetGroupInfo={props.asyncGetGroupInfo}
                    handleClickOpen={handleClickOpen}
                    openAlert={openAlert}
                    handleClose={handleClose}
                  />
                ))
              }
            </List>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.add}>
          <Tooltip title='Add' aria-label='add' onClick={handleClickOpenDialog} >
            <Fab color='primary' className={classes.fab}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
      <Addstudenttogroupdialog
        group={props.groupData.groupName}
        handleCloseDialog={handleCloseDialog}
        asyncGetStudentByFnameAndGroup={props.asyncGetStudentByFnameAndGroup}
        asyncEditStudentData={props.asyncEditStudentData}
        openDialogForm={openDialogForm}
        asyncGetGroupInfo={props.asyncGetGroupInfo}
        asyncAddStudentFromGroup={props.asyncAddStudentFromGroup}
        asyncGetStudentById={props.asyncGetStudentById}
        token={props.token}
      />
    </div>
  );
};
