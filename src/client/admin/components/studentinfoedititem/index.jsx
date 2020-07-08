import React from 'react';
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
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import ExpandLess from '@material-ui/icons/ExpandLess';
import AddIcon from '@material-ui/icons/Add';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormDialog } from '../addorderform';

const useStyles = makeStyles((theme) => ({
  err: {
    border: '1px solid red',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export const StudentinfoEditItem = (props) => {
  const classes = useStyles();
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

  const handleClickToAddOrder = () => {
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

  const detailComponent = () => {
    if (props.kkey === 'orders') {
      return (
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
      );
    } else if (props.kkey === 'group') {
      return (
        <ExpansionPanelDetails>
          <form className={props.classes.edittext} noValidate autoComplete='off' onSubmit={(event) => { event.preventDefault(); }}>
            <Autocomplete
              className={classes.input}
              id='combo-box-demo'
              options={props.groups.map((element) => ({ title: element.group_number }))}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label='Группа' variant='outlined' />}
              onChange={(event, value, reason) => { setCurrentEdit(value.title); }}
              getOptionSelected={(option, value) => true}
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
      );
    } else {
      return (
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
      );
    }
  };
  return (
    <ExpansionPanel expanded={props.expanded === `panel${props.index}`} onChange={props.handleChange(`panel${props.index}`)}>
      <ExpansionPanelSummary
        expandIcon={<EditIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Typography className={props.classes.heading}>{props.kkey}</Typography>
        <Typography className={props.secondaryHeading}>{(Array.isArray(props.value)) ? '' : props.value}</Typography>
      </ExpansionPanelSummary>
      {detailComponent()}
    </ExpansionPanel >
  );
};
