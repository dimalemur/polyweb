import './profilecontent.pcss';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { asyncGetUserData } from '../../store/middleware/asyncGetUser';
import { Regnavbar } from '../regnavbar';
import { logOut } from '../../store/reducers/mainPageReducer';
import avatarIcon from '../../../source/images/icons/ava.svg';


const Profilecontent = (props) => {  
    const [isOwner, setState] = useState(false);

    useEffect(()=> {
        setState(props.isOwner == "true");
        
    })
    const history = useHistory();

    const token = window.localStorage.getItem('polyUser');
    
    const signOut = (event) => {
        props.logOut();
        history.push(`/`);
    } 
    
    const backHome = (event) => {
        history.push(`/${props.login}`);        
        props.asyncGetUserData(token, props.login);
    }      

    return (
        <div className="Profilecontent">
            <Regnavbar />
            <div className="Profilecontent-Wrap">
                <div className="Info Profilecontent-Info">
                    <button onClick = { ( isOwner ) ? signOut : backHome }>  
                        { ( isOwner ) ? "Разлогиниться" : "Домой" }
                    </button> 
                    <div className="Ava Info-Ava">
                        <img className = "Ava-Img" src= { avatarIcon } alt=""/>
                        <span className = "Ava-Text" >{props.userData.name}</span>
                    </div>

                    <div className="Infoblock Info-Personinfo">
                        <p className = 'Infoblock-Title' >
                            Данные обучающегося
                        </p>
                        <p className = "Infoline" > <b>Факультет : </b> {props.userData.name} </p>
                        <p className = "Infoline" > <b>Курс : </b> {props.userData.faq} </p>
                        <p className = "Infoline" > <b>Группа : </b> {props.userData.course} </p>
                        <p className = "Infoline" > <b>Специальность : </b> {props.userData.group} </p>
                        <p className = "Infoline" > <b>Специализация : </b> {props.userData.specialty} </p>
                        <p className = "Infoline" > <b>Срок обучения : </b> {props.userData.specialization} </p> 
                        <p className = "Infoline" > <b>Форма обучения : </b> {props.userData.period} </p>
                        <p className = "Infoline" > <b>Вид финансирования : </b> {props.userData.form} </p>
                        <p className = "Infoline" > <b>Уровень образования : </b>  {props.userData.level}</p>
                        <p className = "Infoline" > <b>Год набора : </b> {props.userData.year} </p>
                    </div>

                    <div className="Infoblock Info-Contactinfo ">
                        <p className = 'Infoblock-Title' >
                            Контактные данные
                        </p>
                        <p className = "Infoline" > <b>Адрес электронной почты : </b> {props.userData.email} </p>
                        <p className = "Infoline" > <b>Номер телефона : </b> {props.userData.tel} </p>
                    </div>
                    <div className="Infoblock Info-Contactinfo ">

                        <p className = 'Infoblock-Title' >
                            Приказы
                        </p>
                    </div>


                </div>
            </div>
        </div>
    )
}


export default connect(
    state =>({
        state: state,
        userData: state.AuthPage.userData,
        isOwner: state.AuthPage.isOwner.isOwner,
        login: state.AuthPage.user.login
    }),
    dispatch => ({
        logOut: () => {   
            dispatch(logOut())
        },
        asyncGetUserData: (token,name) => {              
            dispatch(asyncGetUserData(token,name))
        }
    })
)(Profilecontent);