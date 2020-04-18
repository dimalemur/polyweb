import React, { useEffect, useState } from 'react';
import './grades.pcss';
import { connect } from 'react-redux';
import Select from 'react-select';
import loader from '../../../source/images/icons/loader.png';
import { asyncGetGrades } from '../../store/middleware/asyncGetGrades';

const courses = [1, 2, 3, 4, 5, 6, 7, 8];

const coursesText = courses.map((course, i) => (
  { value: course, label: `${course} семестр` }
));
coursesText.push({ value: 0, label: 'Все' });

const Grades = (props) => {
  const Regnav = props.Regnavbar;
  const [changedSemester, setChangedSemester] = useState(0);
  const token = window.localStorage.getItem('polyUser');

  useEffect(() => {
    if (props.userData.course) {
      props.asyncGetGrades(token, currentSemester); /* eslint no-use-before-define:"Off" */
      setChangedSemester(currentSemester);
    }
  }, [props.course]);

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
    <div className='Grades'>
      <Regnav />
      <div className='Grades-Changesemester'>
        <span className='Grades-Title'>Академическая успеваемость</span>
        <form className='Coursechange Grades-Coursechange' action='submit'>
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
            value={coursesText[changedSemester - 1]}
            isSearchable={false}
          />
        </form>
      </div>
      <div className='Grades-Content'>
        <img className={`Grades-Loader Grades-Loader_${props.loader}`} src={loader}>
        </img>
        {
          props.userGrades.map((el, i) => (
            <div className='Grades-Inner' key={i}>
              <div className='Grades-Semester'>
                <span className='Semester-Text'>
                  {`${el.semester} cеместр`}
                </span>
              </div>
              <div className='Gradetable Grades-Gradetable'>
                <div className='Gradetable-Title'>
                  <div className='Title-Name'>
                    <span>Дисциплина</span>
                  </div>
                  <div className='Title-Type'>
                    <span>Тип cдачи</span>
                  </div>
                  <div className='Title-Grade'>
                    <span>Оценка</span>
                  </div>
                </div>
                {
                  el.orders.map((element) => (
                    <div className='Gradetable-Content' key={element._id}>
                      <div className='Gradetable-Name'>
                        <span>{element.name}</span>
                      </div>
                      <div className='Gradetable-Type'>
                        <span>{element.type}</span>
                      </div>
                      <div className='Gradetable-Grade'>
                        <span>{element.grade}</span>
                      </div>
                    </div>
                  ))
                }

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
)(Grades);
