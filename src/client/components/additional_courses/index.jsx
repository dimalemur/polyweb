import React, { useEffect, useState } from 'react';
import './additional_courses.pcss';
import { connect } from 'react-redux';
import course from '../../../source/images/course.jpg';

const Additionalcourses = (props) => {
  const Regnav = props.Regnavbar;
  return (
    <div className='Additionalcourses'>
      <div className='Promocourses-Wrap'>
        <Regnav />
        <div className='Promocourses Additionalcourses-Promocourses'>
          <h1 className='Promocourses-Title'>
            Дополнительныe образовательные курсы
    </h1>
          <p className='Promocourses-Subtitle'>
            Обнови свои знания
    </p>
          <p className='Promocourses-Text'>
            Дополнительная подготовка студентов по профессиональным программам ориентирована на:
    </p>

          <ul className='Checklist Promocourses-Checklist '>
            <li className='Checklist-Item'>
              Получение дополнительной квалификации для расширения возможностей трудоустройства;
        </li>
            <li className='Checklist-Item'>
              Обучение определенным трудовым функциям, требуемых работодателем;
        </li>
            <li className='Checklist-Item'>
              Изучение новейших достижений техники и технологий в интересующей области деятельности
        </li>
          </ul>
          <button className='Promocourses-Button Button-Blue'>
            Записаться
      </button>
        </div>
      </div>

      <div className='Contentlist Additionalcourses-Contentlist'>
        <p className='Contentlist-Title'>
          Московский Политех приглашает вас на обучение по следующим программам:
      </p>
        <div className='Courses Contentlist-Courses'>
          <div className='Course Courses-Course'>
            <div className='Course-Title'>
              3D моделирование в Blender
          </div>
            <div className='Course-Image'>
              <img src={course} />
            </div>
            <div className='Course-Text'>
              <div className='Course-Description'>
                <span className='Text-Normal'>
                  В онлайн курсе закладываются фундаментальные
                  знания 3D моделирования для компьютерных игр,
                  виртуальной и дополненной реальности, позволяющие
                  не привязываться к программному пакету и быстро
                  освоить любое программное обеспечение при необходимости.
            </span>
              </div>

              <div className='Course-Category'>

                <span className='Text-Semibold'>
                  Категория слушателей:
              </span>

                <span className='Text-Normal'>
                  студенты, дизайнеры, работники ИТ компаний.
              </span>
              </div>

              <div className='Course-Price'>

                <span className='Text-Semibold'>
                  Стоимость обучения:
              </span>

                <span className='Text-Normal'>
                  30 000 руб.
              </span>

              </div>

              <div className='Course-Duration'>
                <span className='Text-Semibold'>
                  Длительность обучения:
              </span>

                <span className='Text-Normal'>
                  108 часов.
              </span>
              </div>

            </div>
            <div className='Course-Button'>
              <button className='Button-Yellow'>Записаться на курс</button>
            </div>
          </div>
          <div className='Course Courses-Course'>
            <div className='Course-Title'>
              3D моделирование в Blender
          </div>
            <div className='Course-Image'>
              <img src={course} />
            </div>
            <div className='Course-Text'>
              <div className='Course-Description'>
                <span className='Text-Normal'>
                  В онлайн курсе закладываются фундаментальные
                  знания 3D моделирования для компьютерных игр,
                  виртуальной и дополненной реальности, позволяющие
                  не привязываться к программному пакету и быстро
                  освоить любое программное обеспечение при необходимости.
            </span>
              </div>

              <div className='Course-Category'>

                <span className='Text-Semibold'>
                  Категория слушателей:
              </span>

                <span className='Text-Normal'>
                  студенты, дизайнеры, работники ИТ компаний.
              </span>
              </div>

              <div className='Course-Price'>

                <span className='Text-Semibold'>
                  Стоимость обучения:
              </span>

                <span className='Text-Normal'>
                  30 000 руб.
              </span>

              </div>

              <div className='Course-Duration'>
                <span className='Text-Semibold'>
                  Длительность обучения:
              </span>

                <span className='Text-Normal'>
                  108 часов.
              </span>
              </div>

            </div>
            <div className='Course-Button'>
              <button className='Button-Yellow'>Записаться на курс</button>
            </div>
          </div>
          <div className='Course Courses-Course'>
            <div className='Course-Title'>
              3D моделирование в Blender
          </div>
            <div className='Course-Image'>
              <img src={course} />
            </div>
            <div className='Course-Text'>
              <div className='Course-Description'>
                <span className='Text-Normal'>
                  В онлайн курсе закладываются фундаментальные
                  знания 3D моделирования для компьютерных игр,
                  виртуальной и дополненной реальности, позволяющие
                  не привязываться к программному пакету и быстро
                  освоить любое программное обеспечение при необходимости.
            </span>
              </div>

              <div className='Course-Category'>

                <span className='Text-Semibold'>
                  Категория слушателей:
              </span>

                <span className='Text-Normal'>
                  студенты, дизайнеры, работники ИТ компаний.
              </span>
              </div>

              <div className='Course-Price'>

                <span className='Text-Semibold'>
                  Стоимость обучения:
              </span>

                <span className='Text-Normal'>
                  30 000 руб.
              </span>

              </div>

              <div className='Course-Duration'>
                <span className='Text-Semibold'>
                  Длительность обучения:
              </span>

                <span className='Text-Normal'>
                  108 часов.
              </span>
              </div>

            </div>
            <div className='Course-Button'>
              <button className='Button-Yellow'>Записаться на курс</button>
            </div>
          </div>
          <div className='Course Courses-Course'>
            <div className='Course-Title'>
              3D моделирование в Blender
          </div>
            <div className='Course-Image'>
              <img src={course} />
            </div>
            <div className='Course-Text'>
              <div className='Course-Description'>
                <span className='Text-Normal'>
                  В онлайн курсе закладываются фундаментальные
                  знания 3D моделирования для компьютерных игр,
                  виртуальной и дополненной реальности, позволяющие
                  не привязываться к программному пакету и быстро
                  освоить любое программное обеспечение при необходимости.
            </span>
              </div>

              <div className='Course-Category'>

                <span className='Text-Semibold'>
                  Категория слушателей:
              </span>

                <span className='Text-Normal'>
                  студенты, дизайнеры, работники ИТ компаний.
              </span>
              </div>

              <div className='Course-Price'>

                <span className='Text-Semibold'>
                  Стоимость обучения:
              </span>

                <span className='Text-Normal'>
                  30 000 руб.
              </span>

              </div>

              <div className='Course-Duration'>
                <span className='Text-Semibold'>
                  Длительность обучения:
              </span>

                <span className='Text-Normal'>
                  108 часов.
              </span>
              </div>

            </div>
            <div className='Course-Button'>
              <button className='Button-Yellow'>Записаться на курс</button>
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
  }),
)(Additionalcourses);
