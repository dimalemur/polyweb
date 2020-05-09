import React from 'react';
import './itemlist.pcss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import { NavLink } from 'react-router-dom';

export const Mainlistitems = (props) => (
  <div className='Mainlistitems'>

    <NavLink to={`/admin/${props.admin}/groups`} >
      <ListItem
        button
        selected={props.selectedIndex === 0}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Группы' />
      </ListItem>
    </NavLink>

    <NavLink to={`/admin/${props.admin}/students`}>
      <ListItem
        button
        selected={props.selectedIndex === 1}
      >
        <ListItemIcon>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText primary='Студенты' />
      </ListItem>
    </NavLink>

    <NavLink to={`/admin/${props.admin}/teachers`}>
      <ListItem
        button
        selected={props.selectedIndex === 2}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary='Преподаватели' />
      </ListItem>
    </NavLink>

    <NavLink to={`/admin/${props.admin}/addinfo`}>
      <ListItem
        button
        selected={props.selectedIndex === 3}
      >
        <ListItemIcon>
          <ErrorOutlineIcon />
        </ListItemIcon>
        <ListItemText primary='Доп.инфо.' />
      </ListItem>
    </NavLink>

  </div >
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Current month' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Last quarter' />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary='Year-end sale' />
    </ListItem>
  </div>
);
