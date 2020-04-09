import React, { useEffect, useState } from 'react';
import './profile.pcss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';
import { Sidebar } from '../../components/sidebar';
import { Menu } from '../../components/menu';
import Profilecontent from '../../components/profileContent';

const Profile = (props) => {
  const [menuVisible, setVisible] = useState(false);

  useEffect(() => {
    props.asyncGetUserData(token, user); /* eslint no-use-before-define: "off" */
  }, []);

  const activateMenu = (event) => {
    setVisible(!menuVisible);
  };

  const token = window.localStorage.getItem('polyUser');
  const user = props.match.params.user; /* eslint prefer-destructuring:"off" */

  if (token === 'null' || token == null) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Profile'>
      < Sidebar activateMenu = { activateMenu } visible = { `visible_${menuVisible}` } />
      < Menu state = { props.state } activateMenu = { activateMenu } visible = { `_visible_${menuVisible}` } />
      <Profilecontent user={ user } visible = { `_visible_${menuVisible}` } />
    </div>
  );
};

export default connect(
  (state) => ({
    state,
  }),
  (dispatch) => ({
    asyncGetUserData: (token, name) => {
      dispatch(asyncGetUserData(token, name));
    },
  }),
)(Profile);
