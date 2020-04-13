import './profilecontent.pcss';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';
import { logOutProfile } from '../../store/reducers/profilePageReducer';
import { logOutGrades } from '../../store/reducers/gradesPageReducer';
import { logOutPage } from '../../store/reducers/mainPageReducer';
import avatarIcon from '../../../source/images/icons/ava.svg';

const Profilecontent = (props) => {
  const [isOwner, setState] = useState(false);

  useEffect(() => {
    setState(props.isOwner === 'true');
  });

  const history = useHistory();

  const token = window.localStorage.getItem('polyUser');

  const signOut = (event) => {
    props.logOut();
  };

  const backHome = (event) => {
    history.push(`/${props.login}`);
    props.asyncGetUserData(token, props.login);
  };

  return (
    <div className= 'Profilecontent'>

      <div className='Profilecontent-Wrap'>
        <div className='Info Profilecontent-Info'>
          <button onClick={(isOwner) ? signOut : backHome}>
            {(isOwner) ? 'Разлогиниться' : 'Домой'}
          </button>

          <div className='Ava Info-Ava'>
            <img className='Ava-Img' src={avatarIcon} alt='' />
            <span className='Ava-Text'>{props.userData.name}</span>
          </div>

          <div className='Infoblock Personinfo Info-Personinfo'>
            <p className='Infoblock-Title Personinfo-Title' >
              Данные обучающегося
            </p>

            <div className='Personinfo-Content'>

              <div className='Personinfo-Name'>
                <p className='Infoline' > <b>Факультет : </b> </p>
                <p className='Infoline' > <b>Курс : </b> </p>
                <p className='Infoline' > <b>Группа : </b> </p>
                <p className='Infoline' > <b>Специальность : </b> </p>
                <p className='Infoline' > <b>Специализация : </b> </p>
                <p className='Infoline' > <b>Срок обучения : </b> </p>
                <p className='Infoline' > <b>Форма обучения : </b> </p>
                <p className='Infoline' > <b>Вид финансирования : </b> </p>
                <p className='Infoline' > <b>Уровень образования : </b> </p>
                <p className='Infoline' > <b>Год набора : </b> </p>
              </div>
              <div className='Personinfo-Value'>
                <p className='Infoline' > {props.userData.faq} </p>
                <p className='Infoline' > {props.userData.course} </p>
                <p className='Infoline' > {props.userData.group} </p>
                <p className='Infoline' > {props.userData.specialty} </p>
                <p className='Infoline' > {props.userData.specialization} </p>
                <p className='Infoline' > {props.userData.period} </p>
                <p className='Infoline' > {props.userData.form} </p>
                <p className='Infoline' > {props.userData.financing} </p>
                <p className='Infoline' > {props.userData.level}</p>
                <p className='Infoline' > {props.userData.year} </p>
              </div>
            </div>
          </div>

          <div className='Infoblock Info-Contactinfo '>

            <p className='Infoblock-Title' >
              Контактные данные
            </p>

            <div className='Personinfo-Content'>
              <div className='Personinfo-Name'>
                <p className='Infoline' > <b>Адрес электронной почты : </b> </p>
                <p className='Infoline' > <b>Номер телефона : </b> </p>
              </div>

              <div className='Personinfo-Value'>
                <p className='Infoline' > {props.userData.email} </p>
                <p className='Infoline' > {props.userData.tel} </p>
              </div>
            </div>

          </div>

          <div className='Infoblock Info-Contactinfo '>

            <p className='Infoblock-Title' >
              Приказы
            </p>

            <div className='Infoblock-Orders'>
              {

                props.userData.orders.map((item, i) => (
                  <p className='Infoline' key={i} >
                    <a href={`http://www.${item.url}`} > {`${i + 1}. ${item.name}`} </a>
                  </p>
                ))
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    state,
    userData: state.profilePage.userData,
    isOwner: state.profilePage.isOwner.isOwner,
    login: state.mainPage.user.login,
  }),
  (dispatch) => ({
    logOut: () => {
      dispatch(logOutProfile());
      dispatch(logOutPage());
      dispatch(logOutGrades());
    },
    asyncGetUserData: (token, name) => {
      dispatch(asyncGetUserData(token, name));
    },
  }),
)(Profilecontent);
