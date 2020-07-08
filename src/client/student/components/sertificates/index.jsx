/* eslint-disable jsx-quotes */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './sertificates.pcss';
import { Modalsertificates } from '../modalsertificates';
import Regnavbar from '../regnavbar';
import searchIcon from '../../../../source/images/icons/search.png';

const Listitemsrt = (props) => (
  <div className="Listitemsrt">
    <span onClick={() => {
      props.setOpenDialog(true);
    }}
    >
      {props.name}
    </span>
  </div>
);

const srtlist = {
  crs: ['Справка о прослушанных дисциплинах за период обучения (справка об обучении)',
    'Справка о прохождении обучения в университете (о статусе обучающегося) по месту требования',
    'Справка в социальные учреждения (Пенсионный фонд, УСЗН и пр.)',
    'Справка-вызов',
    'Запрос на изменение персональных данных',
    'Запрос на восстановление магнитного пропуска'],
  opou: [
    'Оформить дополнительное соглашение к договору об обучении',
    'Отправить квитанцию об оплате обучения или пени',
  ],
  prf: ['Заявка на материальную помощь', 'Оформить дотацию Мэрии г. Москвы', 'Оформить социальную стипендию'],
  mo: ['Справка для получения отсрочки от призыва на военную службу'],
  prc: ['Записаться на практику', 'Заказать сопроводительное письмо на практику'],
  oth: ['Произвольный запрос'],
};

export const Sertificates = (props) => {
  const [isVisibleHistoryReq, setVisibleHistoryReq] = React.useState(false);
  const [isVisibleHelplist, setVisibleHelplist] = React.useState(false);
  const [isOpenDialog, setOpenDialog] = React.useState(false);
  return (
    <div className='Sertificates'>
      <Regnavbar />
      <div className="Sertificates-Inner">
        <div className="Sertificates-Title Title">
          Справки, заявления, запросы
        </div>

        <div className="Sertificates-Content Content_white ">
          <div className="Content-Description Content-Header">
            На этой странице Вы можете заказать необходимую справку, подать заявление <br />
             или сделать запрос.
          </div>

          <div className="Content-Helpline Text_orange Content-Header"
            onClick={() => {
              setVisibleHelplist(!isVisibleHelplist);
            }}
          >
            Как пользоваться этим сервисом ?
          </div>

          <div className={`Sertificates-Helplist Helplist-Isvisible_${isVisibleHelplist}`}>
            <div className="Helplist-Instruction">
              <div className='Helplist-Item'>1) Кликните на необходимый вид документа</div>
              <div className='Helplist-Item'>2) Заполните форму на сайте</div>
              <div className='Helplist-Item'>
                3) Отследите готовность документа в разделе “История запросов”. Средний срок готовности
                одного документа составляет 5-6 дней.
            </div>
            </div>
            <button className='Sertificates-Button Button-White' onClick={() => {
              setVisibleHelplist(!isVisibleHelplist);
            }}
            >
              Мне все понятно!
            </button>
          </div>

          <div className="Content-Helpline Text_blue Content-Header" onClick={() => { setVisibleHistoryReq(!isVisibleHistoryReq); }}>
            История запросов
          </div>

          <div className={`Content-Table Table-Isvisible_${isVisibleHistoryReq}`}>
            <div className="Table-Rowname">
              Дата
              </div>
            <div className="Table-Rowname">
              Рег. номер
              </div>
            <div className="Table-Rowname">
              Запрос
              </div>
            <div className="Table-Rowname">
              Статус, дата
              </div>
            <div className="Table-Rowname">
              Структурное подразделение, адрес
              </div>

            <div className="Table-Cell">
              27.02.2019
              </div>
            <div className="Table-Cell">
              SR20022029787
              </div>
            <div className="Table-Cell">
              Справка об обучении по месту пребывания
              </div>
            <div className="Table-Cell Cell_green">
              Готово 27.03.2020
              </div>
            <div className="Table-Cell">
              Отделение ЦРС на Большой Семеновской: <br />
              Ул. Большая Семеновская, 38;<br />
              Аудитории: В-101, В-102, В-107;<br />
              Телефон: 8-800-555-35-35
              </div>
          </div>

          <form>
            <div className="Searchdoc Sertificates-Searchdoc Content-Header">
              <input className="Searchdoc-Inp" type="text" placeholder='Введите название документа или ключевые слова' />
              <button className="Searchdoc-Btn"><img src={searchIcon} alt="" /></button>
            </div>
          </form>
          <div className="Sertificates-Cards">
            <div className="Cards-Rb Border_yellow">
              <div className="Cards-Title Bg_yellow">
                Центры по работе со студентами
              </div>

              <div className="Cards-List">

                {srtlist.crs.map((el, i) => (
                  <Listitemsrt key={i} name={el} setOpenDialog={setOpenDialog} />
                ))}
              </div>
            </div>
            <div className="Cards-Lb Border_lightgreen">
              <div className="Cards-Title Bg_lightgreen">
                Отдел платных образовательных услуг
              </div>
              <div className="Cards-List">
                {srtlist.opou.map((el, i) => (
                  <Listitemsrt key={i} name={el} setOpenDialog={setOpenDialog} />
                ))}
              </div>
            </div>
            <div className="Cards-Lb Border_green">
              <div className="Cards-Title Bg_green">
                Профсюз
              </div>
              <div className="Cards-List">
                {srtlist.prf.map((el, i) => (
                  <Listitemsrt key={i} name={el} setOpenDialog={setOpenDialog} />
                ))}
              </div>
            </div>
            <div className="Cards-Lb Border_lightblue">
              <div className="Cards-Title Bg_lightblue">
                Мобилизационный отдел
              </div>
              <div className="Cards-List">
                {srtlist.mo.map((el, i) => (
                  <Listitemsrt key={i} name={el} setOpenDialog={setOpenDialog} />
                ))}
              </div>
            </div>
            <div className="Cards-Lb Border_blue">
              <div className="Cards-Title Bg_blue">
                Практика
              </div>
              <div className="Cards-List">
                {srtlist.prc.map((el, i) => (
                  <Listitemsrt key={i} name={el} setOpenDialog={setOpenDialog} />
                ))}
              </div>
            </div>
            <div className="Cards-Lb Border_violet">
              <div className="Cards-Title Bg_violet">
                Прочее
            </div>
              <div className="Cards-List">
                {srtlist.oth.map((el, i) => (
                  <Listitemsrt key={i} name={el} setOpenDialog={setOpenDialog} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Modalsertificates isOpenDialog={isOpenDialog} setOpenDialog={setOpenDialog} />

      </div >
    </div >
  );
};

