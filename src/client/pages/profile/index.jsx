import React, { useEffect, useState } from 'react';
import './profile.pcss';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';
import { setMenuVisible } from '../../store/reducers/mainPageReducer';
import { Sidebar } from '../../components/sidebar';
import Menu from '../../components/menu';
import Grades from '../../components/grades';
import Visits from '../../components/visits';
import { WidthGetJobNews } from '../../highOrderComponents/asyncGetJobNews';
import Faculties from '../../components/faculties';
import Additionalcourses from '../../components/additional_courses';
import Profilecontent from '../../components/profileContent';
import { Backgroundcontainer } from '../../components/backgroundcontainer';
import { Backgrounds } from '../../components/backgrounds';
import Settings from '../../components/settings';

const Profile = (props) => {
  useEffect(() => {
    props.asyncGetUserData(token, user); /* eslint no-use-before-define: "off" */
  }, []);

  const [fixPosition, setFixPosition] = useState(false);

  const token = window.localStorage.getItem('polyUser');
  const user = props.match.params.user; /* eslint prefer-destructuring:"off" */

  if (token === 'null' || token == null) {
    return <Redirect to='/' />;
  }

  return (
    <div className={`Profile Profile_fixpos_${fixPosition} `}>
      {/* Сайдбар */}
      < Sidebar user={user}
        activateMenu={props.setMenuVisible}
      />

      {/* Боковое выпадающее меню */}
      < Menu state={props.state}
        activateMenu={props.setMenuVisible}
        user={user}
      />

      {/* Профиль */}
      < Route exact
        path='/:user'
        render={() => (
          <Backgroundcontainer
            page={Profilecontent}
            menuVisible={props.menuVisible}
            background={Backgrounds.Blue}
          />
        )}
      />

      {/* Настройки */}
      < Route exact
        path='/:user/settings'
        render={() => (
          <Backgroundcontainer
            page={Settings}
            menuVisible={props.menuVisible}
            background={Backgrounds.Blue}
            fixPosition={fixPosition}
            setFixPosition={setFixPosition}
          />
        )}
      />
      {/* Успеваемость */}
      < Route exact
        path='/:user/performance'
        render={() => (
          <Backgroundcontainer
            page={Grades}
            menuVisible={props.menuVisible}
            background={Backgrounds.GreenBlue}
          />
        )}
      />

      {/* Трудоустройство */}
      < Route exact
        path='/:user/practic'
        render={() => (
          <Backgroundcontainer
            page={WidthGetJobNews}
            menuVisible={props.menuVisible}
            background={Backgrounds.CurveBLue}
          />
        )}
      />

      {/* Посещения по физкультуре */}
      < Route exact
        path='/:user/visits'
        render={() => (
          <Backgroundcontainer
            page={Visits}
            menuVisible={props.menuVisible}
            background={Backgrounds.GreenBlue}
          />
        )}
      />

      {/* Образовательные программы */}
      < Route exact
        path='/:user/faculties'
        render={() => (
          <Backgroundcontainer
            page={Faculties}
            menuVisible={props.menuVisible}
            background={Backgrounds.GreenBlue}
          />
        )}
      />

      {/* Дополнительные курсы */}
      < Route exact
        path='/:user/additional_courses'
        render={() => (
          <Backgroundcontainer page={Additionalcourses}
            menuVisible={props.menuVisible}
            background={Backgrounds.YellowLightYellow}
            bgDefault='Darkblue'
          />
        )}
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
