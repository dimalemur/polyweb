import React, { useEffect, useState } from 'react';
import './profile.pcss';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';
import { setMenuVisible } from '../../store/reducers/mainPageReducer';
import { Sidebar } from '../../components/sidebar';
import Menu from '../../components/menu';
import Grades from '../../components/grades';
import Profilecontent from '../../components/profileContent';
import { Backgroundcontainer } from '../../components/backgroundcontainer';

const Profile = (props) => {
  useEffect(() => {
    props.asyncGetUserData(token, user); /* eslint no-use-before-define: "off" */
  }, []);

  const token = window.localStorage.getItem('polyUser');
  const user = props.match.params.user; /* eslint prefer-destructuring:"off" */

  if (token === 'null' || token == null) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Profile'>

      < Sidebar user={user}
                activateMenu={props.setMenuVisible}
                visible={`_visible_${props.menuVisible}`}
      />
      < Menu state={props.state}
             activateMenu={props.setMenuVisible}
             visible={`_visible_${props.menuVisible} `}
             user={user}
      />
      < Route exact
              path='/:user'
              render={() => <Profilecontent user={user}
                                            visible={`_visible_${props.menuVisible}`}
                            />}
      />
      < Route exact
              path='/:user/timetable'
              render={() => <Backgroundcontainer page={Grades} menuVisible = {props.menuVisible} />}
      />

    </div>
  );
};

export default connect(
  (state) => ({
    state,
    menuVisible: state.AuthPage.pagesState.menuVisible,
  }),
  (dispatch) => ({
    asyncGetUserData: (token, name) => {
      dispatch(asyncGetUserData(token, name));
    },
    setMenuVisible: () => {
      dispatch(setMenuVisible());
    },
  }),
)(Profile);
