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
import { Backgrounds } from '../../components/backgrounds';

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
      />
      < Menu state={props.state}
        activateMenu={props.setMenuVisible}
        user={user}
      />
      < Route exact
        path='/:user'
        render={() => <Backgroundcontainer page={Profilecontent} menuVisible={props.menuVisible} background={Backgrounds.Blue} />}
      />
      < Route exact
        path='/:user/timetable'
        render={() => <Backgroundcontainer page={Grades} menuVisible={props.menuVisible} background={Backgrounds.GreenBlue} />}
      />

      < Route exact
        path='/:user/additional_courses'
        render={() => <Backgroundcontainer page={Grades} menuVisible={props.menuVisible} background={Backgrounds.YellowLightYellow} />}
      />

    </div>
  );
};

export default connect(
  (state) => ({
    state,
    menuVisible: state.mainPage.pagesState.menuVisible,
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
