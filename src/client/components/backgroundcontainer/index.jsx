import React from 'react';
import './backgroundcontainer.pcss';
import bggreen from '../../../source/images/bggreen.svg';
import bgblue from '../../../source/images/bgblue.svg';
import Regnavbar from '../regnavbar';

export const Backgroundcontainer = (props) => {
  const Page = props.page;
  return (
    <div className={`Backgroundcontainer Backgroundcontainer-Menu_visible_${props.menuVisible}`}>
      <div className = 'Backgroundcontainer-Wrap'>
        <img className = 'Backgroundcontainer-Green' src={ bggreen }/>
        <img className = 'Backgroundcontainer-Blue' src= { bgblue }/>
      </div>
      <Regnavbar />
      <Page />
    </div>
  );
};

