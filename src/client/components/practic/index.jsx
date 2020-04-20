import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './practic.pcss';

const News = (props) => {
  const [isOpened, setOpen] = useState(false);
  return (
    <div className='Practicnews Practic-Practicnews'>
      <p className='Practicnews-Title' onClick={(e) => { setOpen(!isOpened); }}>
        <span>
          {props.title}
        </span>
        <span className='Open'>
          {(isOpened) ? '-' : '+'}
        </span>
      </p>

      <p className='Practicnews-Date'>
        {props.date}
      </p>
      <div
        className={`Practicnews-Content Practicnews-Content_open_${isOpened}`}
        dangerouslySetInnerHTML={{ __html: props.html }}
      />
    </div>
  );
};
/* eslint prefer-destructuring:"off" */
const Practic = (props) => {
  const Regnav = props.Regnav;
  const token = window.localStorage.getItem('polyUser');

  useEffect(() => { props.getData(token); }, [props.newsCount]);

  return (
    <div className='Practic'>
      <Regnav />
      <div className='Practic-Inner'>
        <h2 className='Practic-Title'>
          Новости трудоустройства
        </h2>
        {
          props.externalData.map((element, i) => (
            element.map((el, j) => <News key={i + j} title={el.title} date={el.date} html={el.html} />)
          ))
        }
        <div className='Practic-Next'>
          <span onClick={(e) => { props.setNewsCount(props.newsCount + 15); }} >Дальше</span>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    state,
  }),
  (dispatch) => ({
  }),
)(Practic);
