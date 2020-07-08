import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './timetable.pcss';

import { asyncGetTimetable } from '../../store/middleware/asyncGetTimetable';

const lessonTime = {
  1: '9:00 - 10:30',
  2: '10:40 - 12:10',
  3: '12:20 - 13:50',
  4: '14:30 - 16:00',
  5: '16:10 - 17:40',
  6: '17:50 - 19:20',
  7: '19:30 - 21:00',
};

const days = {
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  7: 'Воскресенье',
};

const parseDate = (date, setOld) => {
  const options = {
    month: 'short',
    day: 'numeric',
  };
  return new Date(Date.parse(date)).toLocaleDateString('ru', options);
};

const Lessons = (day, dayNum, isSession) => {
  if (day !== undefined) {
    const res = Object.keys(day).map((el) => {
      if (day[el].length !== 0) {
        const lessons = day[el].map((element, i) => (
          <div key={Number(dayNum).toString() + Number(el).toString() + Number(i).toString()} className='Day-Lesson'>
            <div className={`Lesson-Auditory Lesson-Auditory_${(!isSession) ? new Date(Date.parse(element.dt)) > new Date() : true}`} >
              <span>
                {
                  element.auditories.map((auditory, j) => (
                    <div key={Number(dayNum).toString() + Number(el).toString() + Number(i).toString() + Number(j).toString()}
                      dangerouslySetInnerHTML={{ __html: auditory.title }}
                    ></div>
                  ))
                }
              </span>
            </div>
            <div className={`Lesson-Name Lesson-Name_${(!isSession) ? new Date(Date.parse(element.dt)) > new Date() : true}`}>
              <span>
                {`${element.sbj} (${element.type})`}
              </span>
            </div>
            <div className={`Lesson-Teacher Lesson-Teacher_${(!isSession) ? new Date(Date.parse(element.dt)) > new Date() : ''}`}>
              <span>
                {element.teacher}
              </span>
            </div>

            {
              (!isSession)
                ? (<div className='Lesson-Dateperiod'>
                  {
                    `${parseDate(element.df)}
                              - 
                                ${parseDate(element.dt)}`
                  }
                </div>)
                : ''
            }

          </div>
        ));

        return (
          <div className='Lesson-Wrap' >
            <div className='Lesson-Time'>
              <span>
                {lessonTime[el]}
              </span>
            </div>
            {lessons}
          </div>
        );
      } else {
        return '';
      }
    });
    return res;
  }
  return 'Загрузка...';
};

const Timetable = (props) => {
  let currentDayIndex = 0;
  const Navbar = props.Regnavbar;
  const token = window.localStorage.getItem('polyUser');

  useEffect(() => {
    if (props.group) {
      props.asyncGetTimetable(token, props.group);
    }
  }, [props.group]);

  return (
    <div className='Timetable'>
      <Navbar />
      <div className='Timetable-Inner'>
        <h2 className='Timetable-Title Title'>
          Расписание
        </h2>
        <p className='Timetable-Group'>
          Группа: {props.group}
        </p>
        <div className='Rasp Timetable-Content Timetable-Rasp'>

          {
            // Обход дней недели
            (Array.isArray(props.timeTable))
              ? (Object.keys(days).map((day) => (
                <div key={day} className='Rasp-Monday Rasp-Day Day'>
                  <div className='Day-Title'>
                    {days[day]}
                  </div>
                  {
                    Lessons(props.timeTable[day], day, false)
                  }
                </div>
              )))
              : (Object.keys(props.timeTable).map((day) => {
                currentDayIndex += 1;
                if (currentDayIndex > 7) {
                  currentDayIndex = 1;
                }
                return (
                  <div key={day} className='Rasp-Monday Rasp-Day Day'>
                    <div className='Day-Title'>
                      {days[currentDayIndex]}
                    </div>
                    {
                      Lessons(props.timeTable[day], day, true)
                    }
                  </div>
                );
              }))

          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state,
  timeTable: state.timetablePage.timetable,
  group: state.profilePage.userData.group,
});

const mapDispatchToProps = (dispatch) => ({
  asyncGetTimetable: (token, group) => {
    dispatch(asyncGetTimetable(token, group));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timetable);
