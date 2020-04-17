import React from 'react';
import './backgroundcontainer.pcss';
import Regnavbar from '../regnavbar';

export const Backgroundcontainer = (props) => {
  const Page = props.page;
  const Background = props.background;
  return (
    <div className={`Backgroundcontainer Wrap-${props.bgDefault} Backgroundcontainer-Menu_visible_${props.menuVisible}`}>
      <Background />
      <Page Regnavbar={Regnavbar} props={props} />
    </div>
  );
};

