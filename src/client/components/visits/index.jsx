import React, { useEffect, useState } from 'react';
import './visits.pcss';
import { connect } from 'react-redux';
import Select from 'react-select';
import loader from '../../../source/images/icons/loader.png';
import { asyncGetSportVisits } from '../../store/middleware/asyncGetSportVisits';

// ---------Заглушка для курсов ---------------//
const courses = [1, 2, 3, 4, 5, 6, 7, 8];

const coursesText = courses.map((course, i) => (
  { value: course, label: `${course} семестр` }
));
coursesText.push({ value: 0, label: 'Все' });
// ----------------------------------------------//

const Visits = (props) => {
  const Regnav = props.Regnavbar;
  const [changedSemester, setChangedSemester] = useState(0);
  const token = window.localStorage.getItem('polyUser');

  useEffect(() => {
    if (props.userData.course) {
      props.asyncGetSportVisits(token, currentSemester); /* eslint no-use-before-define:"Off" */
      setChangedSemester(currentSemester);
    }
  }, [props.userData.course]);

  // ------------ Узнаем текущий семестр -----------//
  const date = new Date();
  const day = date.getDay();
  const mounth = date.getMonth();
  const currentSemester = (mounth > 2 && day > 21) ? Number(props.course) * 2 : Number(props.course) * 2 - 1;
  // ----------------------------------------------//

  const formatDate = (unFormattedDate) => {
    let dd = unFormattedDate.getDate();
    if (dd < 10) dd = `0 ${dd}`;

    let mm = unFormattedDate.getMonth() + 1;
    if (mm < 10) mm = `0 ${mm}`;

    let yy = unFormattedDate.getFullYear() % 100;
    if (yy < 10) yy = `0 ${yy}`;

    return `${dd} . ${mm} . ${yy}`;
  };

  const handleChangeCourse = (event) => {
    if (changedSemester !== event.value) {
      props.asyncGetSportVisits(token, event.value);
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
            value ={coursesText[changedSemester - 1]}
            isSearchable={false}
          />
        </form>
      </div>

      <div className='Visits-Content'>
        <img className={`Grades-Loader Grades-Loader_${props.loader}`} src={loader}>
        </img>
        <div className='Journal'>
          <span className='Journal-Title'>
            Журнал посещений по физической культуре
                </span>
        </div>
        {
          props.userVisits.map((el, i) => (
            <div className='Visits-Inner' key={i}>
              <div className='Journal'>
                <span className='Journal-Title'>
                  {`${el.semester} cеместр`}
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
                  el.visits.map((element) => {
                    const formattedDate = formatDate(new Date(element.date));
                    return (
                      <div className='Visitstable-Content' key={element._id}>
                        <div className='Visitstable-Date'>
                          <span> {formattedDate} </span>
                        </div>
                        <div className='Visitstable-Section'>
                          <span>{element.section}</span>
                        </div>
                      </div>
                    );
                  })
                }

              </div>

              <div className='Visits-Count'>
                <span className='Count-Have'>Общее количество посещений: {el.countNeed} </span>
                <span className='Count-All'>Минимальное количество посещений: {el.count}</span>
                <span className='Count-Need'>Осталось: {el.count - el.countNeed} </span>
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
    userVisits: state.sportVisitsPage.userVisits,
    course: state.profilePage.userData.course,
    loader: state.sportVisitsPage.pagesState.loader,
  }),
  (dispatch) => ({
    asyncGetSportVisits: (token, semester = 0) => {
      dispatch(asyncGetSportVisits(token, semester));
    },
  }),
)(Visits);
