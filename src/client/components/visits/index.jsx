import React, { useEffect, useState } from 'react';
import './visits.pcss';
import { connect } from 'react-redux';
import Select from 'react-select';
import loader from '../../../source/images/icons/loader.png';
import { asyncGetGrades } from '../../store/middleware/asyncGetGrades';

const courses = [1, 2, 3, 4, 5, 6, 7, 8];

const coursesText = courses.map((course, i) => (
  { value: course, label: `${course} семестр` }
));
coursesText.push({ value: 0, label: 'Все' });

const Visits = (props) => {
  const Regnav = props.Regnavbar;
  const [changedSemester, setChangedSemester] = useState(0);
  const token = window.localStorage.getItem('polyUser');

  useEffect(() => {
    if (props.userData.course) {
      props.asyncGetGrades(token, currentSemester); /* eslint no-use-before-define:"Off" */
      setChangedSemester(currentSemester);
    }
  }, [props.userData.course]);

  const date = new Date();
  const day = date.getDay();
  const mounth = date.getMonth();
  const currentSemester = (mounth > 2 && day > 21) ? Number(props.course) * 2 : Number(props.course) * 2 - 1;

  const handleChangeCourse = (event) => {
    if (changedSemester !== event.value) {
      props.asyncGetGrades(token, event.value);
      setChangedSemester(event.value);
    }
  };

  return (
    <div className='Visits'>
      <Regnav />
      <div className='Visits-Changesemester'>
        <span className='Visits-Title'>Физическая культура</span>
        <form className='Coursechange Visits-Coursechange' action='submit'>
          <Select
            onChange={handleChangeCourse}
            options={coursesText}
            styles={{
              valueContainer: (base) => ({
                ...base,
                minHeight: '30px',
                justifyContent: 'center',
              }),
              indicatorSeparator: () => ({}),
              dropdownIndicator: (base) => ({
                ...base,
                color: '#F79329',
                '&:hover': {
                  color: '#F79329',
                },
              }),
              control: (base) => ({
                ...base,
                borderColor: 'gray',

                '&:hover': {},
              }),
            }}
            defaultValue={coursesText[0]}
            isSearchable={false}
          />
        </form>
      </div>
      <div className='Visits-Content'>
        <img className={`Grades-Loader Grades-Loader_${props.loader}`} src = {loader}>
        </img>
        {
          props.userGrades.map((el, i) => (
            <div className='Visits-Inner' key={i}>
              <div className='Journal'>
                <span className='Journal-Title'>
                  Журнал посещений по физической культуре
                </span>
              </div>
              <div className='Visitstable Visits-Visitstable'>
                <div className='Visitstable-Title'>
                  <div className='Title-Date'>
                    <span>Дата</span>
                  </div>
                  <div className='Title-Section'>
                    <span>Секция</span>
                  </div>
                </div>
                {
                  el.orders.map((element) => (
                    <div className='Visitstable-Content' key={element._id}>
                      <div className='Visitstable-Date'>
                        <span>{element.name}</span>
                      </div>
                      <div className='Visitstable-Section'>
                        <span>{element.type}</span>
                      </div>
                    </div>
                  ))
                }

              </div>

              <div className="Visits-Count">
                <span className="Count-Have">Общее количество посещений:</span>
                <span className="Count-All">Минимальное количество посещений:</span>
                <span className="Count-Need">Осталось:</span>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    state,
    userData: state.profilePage.userData,
    userGrades: state.gradesPage.userGrades,
    course: state.profilePage.userData.course,
    loader: state.gradesPage.pagesState.loader,
  }),
  (dispatch) => ({
    asyncGetGrades: (token, semester = 0) => {
      dispatch(asyncGetGrades(token, semester));
    },
  }),
)(Visits);
