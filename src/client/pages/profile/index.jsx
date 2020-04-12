import React, { useEffect, useState } from 'react';
import './profile.pcss';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';
import { Sidebar } from '../../components/sidebar';
import { Menu } from '../../components/menu';
import { Marks } from '../../components/marks';
import { Journalpe } from '../../components/journalpe';
import { Faculties } from '../../components/faculties';
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
      < Sidebar activateMenu={activateMenu} visible={`_visible_${menuVisible}`} />
      < Menu state={props.state} activateMenu={activateMenu} visible={`_visible_${menuVisible} `} user = { user } />
      < Route exact path='/:user' render={() => <Profilecontent user={user} visible={`_visible_${menuVisible}`} activateMenu={activateMenu} />} />
      < Route exact path='/:user/timetable' render= { () => <h1>asassadsadadasdasdasdd</h1> } />
      < Route exact path='/:user/marks' render= { () => <Marks /> } />
      < Route exact path='/:user/journalpe' render= { () => <Journalpe /> } />
      < Route exact path='/:user/faculties' render= { () => <Faculties /> } />
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
