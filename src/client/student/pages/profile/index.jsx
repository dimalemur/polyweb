import React, { useEffect, useState } from 'react';
import './profile.pcss';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sidebar } from '../../components/sidebar';
import Menu from '../../components/menu';
import Grades from '../../components/grades';
import Visits from '../../components/visits';
import Faculties from '../../components/faculties';
import Profilecontent from '../../components/profileContent';
import Myfinances from '../../components/myfinances';
import Additionalcourses from '../../components/additional_courses';
import Timetable from '../../components/timetable';
import { Backgroundcontainer } from '../../components/backgroundcontainer';
import { Backgrounds } from '../../components/backgrounds';
import Settings from '../../components/settings';
import { WidthGetJobNews } from '../../highOrderComponents/asyncGetJobNews';
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';
import { setMenuVisible, logOutPage } from '../../store/reducers/mainPageReducer';
import { logOutProfile } from '../../store/reducers/profilePageReducer';
import { logOutGrades } from '../../store/reducers/gradesPageReducer';

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
      <Sidebar user={user}
        activateMenu={props.setMenuVisible}
      />

      {/* Боковое выпадающее меню */}
      <Menu state={props.state}
        activateMenu={props.setMenuVisible}
        user={user}
      />

      {/* Профиль */}
      <Route exact
        path='/:user'
        render={() => (
          <Backgroundcontainer
            page={Profilecontent}
            menuVisible={props.menuVisible}
            background={Backgrounds.Blue}
            user={user}
          />
        )}
      />

      {/* Настройки */}
      <Route exact
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
      <Route exact
        path='/:user/performance'
        render={() => (
          <Backgroundcontainer
            page={Grades}
            menuVisible={props.menuVisible}
            background={Backgrounds.GreenBlue}
          />
        )}
      />

      {/* Расписание */}
      <Route exact
        path='/:user/timetable'
        render={() => (
          <Backgroundcontainer
            page={Timetable}
            menuVisible={props.menuVisible}
            background={Backgrounds.GreenBlue}
          />
        )}
      />

      {/* Посещения по физкультуре */}
      <Route exact
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
      <Route exact
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
      <Route exact
        path='/:user/additional_courses'
        render={() => (
          <Backgroundcontainer page={Additionalcourses}
            menuVisible={props.menuVisible}
            background={Backgrounds.YellowLightYellow}
            bgDefault='Darkblue'
          />
        )}
      />

      {/* Трудоустройство */}
      <Route exact
        path='/:user/practic'
        render={() => (
          <Backgroundcontainer
            page={WidthGetJobNews}
            menuVisible={props.menuVisible}
            background={Backgrounds.CurveBLue}
          />
        )}
      />

      {/* Мои финансы */}
      < Route exact
        path='/:user/myfinances'
        render={() => (
          <Backgroundcontainer
            page={Myfinances}
            menuVisible={props.menuVisible}
            background={Backgrounds.CurveVectorBLue}
          />
        )}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
  menuVisible: state.mainPage.pagesState.menuVisible,
  login: state.mainPage.user.login,
});

const mapDispatchToProps = (dispatch) => ({
  asyncGetUserData: (token, name) => {
    dispatch(asyncGetUserData(token, name));
  },
  setMenuVisible: () => {
    dispatch(setMenuVisible());
  },
  logOut: () => {
    dispatch(logOutProfile());
    dispatch(logOutPage());
    dispatch(logOutGrades());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
