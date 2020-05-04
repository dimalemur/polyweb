import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ListSubheader from '@material-ui/core/ListSubheader';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormDialog } from '../addorderform';
import { asyncGetStudent, asyncGetStudentData } from '../../store/middleware/asyncGetStudent';
import { asyncEditStudentData, asyncDeleteStudentOrdersData, asyncAddStudentOrdersData } from '../../store/middleware/asyncEditStudentInfo';
import { setLoading } from '../../store/reducers/studentsPageReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  orders: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
  nested: {
    paddingLeft: theme.spacing(4),
  },
  edittext: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  list: {
    marginTop: '3em',
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  demo: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  fab: {
    margin: theme.spacing(2),
  },
  fabWrap: {
    width: '100%',
    justifyContent: 'center',
  },

}));

const Studentinfoitem = (props) => {
  const [currentEdit, setCurrentEdit] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = React.useState(null);
  const [isOpenDialog, setOpenDialog] = React.useState(false);

  const handleClickToOpen = (elementId) => {
    if (elementId === open) {
      setOpen(null);
    } else {
      setOpen(elementId);
    }
  };

  const handleCloseDiadlog = () => {
    setOpenDialog(false);
  };

  const handleClickToAddOrder = (event) => {
    setOpenDialog(true);
  };

  const addOrder = (event, name, url) => {
    event.preventDefault();
    props.asyncAddStudentOrdersData(props.token, props.userId, props.userDataId, name, url);
    handleCloseDiadlog();
  };

  const handleClickToDeleteOrder = (orderID) => {
    props.asyncDeleteStudentOrdersData(props.token, props.userId, props.userDataId, orderID);
    console.log(`удалено ${orderID}`);
  };

  const handleEditData = (event, key) => {
    props.setLoading(true);
    props.asyncEditStudentData(props.token, props.userDataId, props.userId, { [key]: currentEdit });
  };
  if (props.kkey === 'orders') {
    return (
      <ExpansionPanel expanded={props.expanded === `panel${props.index}`} onChange={props.handleChange(`panel${props.index}`)}>
        <ExpansionPanelSummary
          expandIcon={<EditIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography className={props.classes.heading}>{props.kkey}</Typography>
          <Typography className={props.secondaryHeading}>Приказы</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={props.classes.demo}>
            <List dense={dense} className={props.classes.orders}>
              {
                props.value.map((element) => (
                  <List
                    key={element._id}
                    component='nav'
                    aria-labelledby='nested-list-subheader'
                    className={props.classes.orders}
                  >
                    <ListItem button>
                      <ListItemIcon onClick={(event) => { handleClickToDeleteOrder(element._id); }}>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary={element.name} />
                      <div onClick={(event) => { handleClickToOpen(element._id); }} >
                        {(open === element._id) ? <ExpandLess /> : <ExpandMore />}
                      </div>
                    </ListItem>
                    <Collapse in={(open === element._id)} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding>
                        <ListItem button className={props.classes.nested}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={`url: ${element.url}`} />
                        </ListItem>
                      </List>
                    </Collapse>
                  </List>
                ))
              }
              <ListItemIcon className={props.classes.fabWrap}>
                <Tooltip title='Add' aria-label='add' onClick={handleClickToAddOrder} >
                  <Fab color='primary' className={props.classes.fab}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
                <FormDialog handleCloseDiadlog={handleCloseDiadlog}
                  isOpenDialog={isOpenDialog}
                  addOrder={addOrder}
                />
              </ListItemIcon>
            </List>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel >
    );
  }

  return (
    <ExpansionPanel expanded={props.expanded === `panel${props.index}`} onChange={props.handleChange(`panel${props.index}`)}>
      <ExpansionPanelSummary
        expandIcon={<EditIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Typography className={props.classes.heading}>{props.kkey}</Typography>
        <Typography className={props.secondaryHeading}>{props.value}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <form className={props.classes.edittext} noValidate autoComplete='off' onSubmit={(event) => { event.preventDefault(); props.setLoading(true); }}>
          <TextField id='fullname'
            label='Введите новые данные'
            fullWidth={true}
            onChange={(event) => { setCurrentEdit(event.target.value); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant='contained'
            color='primary'
            size='small'
            type='submit'
            className={props.classes.button}
            onClick={(event) => { handleEditData(event, props.kkey); }}
          >
            Сохранить
        </Button>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel >
  );
};

const Studentinfo = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className='Students-Info'>
      <div className={props.classes.list}>
        {
          (props.studentData !== undefined && Object.keys(props.studentData).length !== 0)
            ? Object.keys(props.studentData).map((key, i) => {
              if (key !== '__v' && key !== '_id') {
                return (
                  <Studentinfoitem key={i}
                    kkey={key}
                    value={props.studentData[key]}
                    userDataId={props.studentData._id}
                    userId={props.studentData.userId}
                    classes={props.classes}
                    index={i}
                    handleChange={handleChange}
                    expanded={expanded}
                    token={props.token}
                    asyncEditStudentData={props.asyncEditStudentData}
                    asyncDeleteStudentOrdersData={props.asyncDeleteStudentOrdersData}
                    asyncAddStudentOrdersData={props.asyncAddStudentOrdersData}
                    setLoading={props.setLoading}
                  />
                );
              }
              return '';
            })
            : 'Нет записи'
        }

      </div>
    </div>
  );
};

const Studentinput = (props) => {
  const [studentId, setStudentId] = React.useState(null);

  const handleChangeStudent = (event) => {
    event.preventDefault();
    props.setLoading(true);
    props.asyncGetStudent(props.token, studentId);
  };
  return (
    <div className='Students-Input'>
      <Paper component='form' className={props.classes.root}>
        <InputBase
          className={props.classes.input}
          placeholder='Id'
          inputProps={{ 'aria-label': 'Id' }}
          onChange={(event) => { event.preventDefault(); setStudentId(event.target.value); }}
        />
        <IconButton type='submit' className={props.classes.iconButton} aria-label='search' onClick={handleChangeStudent}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

const Editstudents = (props) => {
  const token = window.localStorage.getItem('polyAdmin');
  const classes = useStyles();

  return (
    <div className='Students-Add'>
      <h2>Введите Id студента</h2>
      <Studentinput classes={classes} asyncGetStudent={props.asyncGetStudent} token={token} setLoading={props.setLoading} />

      <div className={classes.loader}>
        <Fade
          in={props.loading}
          style={{
            transitionDelay: props.loading ? '60ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </div>

      <Studentinfo classes={classes}
        studentData={props.studentData}
        token={token}
        asyncEditStudentData={props.asyncEditStudentData}
        asyncDeleteStudentOrdersData={props.asyncDeleteStudentOrdersData}
        asyncAddStudentOrdersData={props.asyncAddStudentOrdersData}
        setLoading={props.setLoading}
      />

    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
  login: state.studentPage.student.login,
  studentData: state.studentPage.studentData,
  loading: state.studentPage.loading,
});
const mapDispatchToProps = (dispatch) => ({
  asyncGetStudent: (token, userId) => {
    dispatch(asyncGetStudent(token, userId));
  },
  setLoading: (val) => {
    dispatch(setLoading(val));
  },
  asyncGetStudentData: (token, username) => {
    dispatch(asyncGetStudentData(token, username));
  },
  asyncEditStudentData: (token, id, userId, newData) => {
    dispatch(asyncEditStudentData(token, id, userId, newData));
  },
  asyncDeleteStudentOrdersData: (token, userId, pageId, orderId) => {
    dispatch(asyncDeleteStudentOrdersData(token, userId, pageId, orderId));
  },
  asyncAddStudentOrdersData: (token, userId, pageId, name, url) => {
    dispatch(asyncAddStudentOrdersData(token, userId, pageId, name, url));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Editstudents);
