import React from 'react';
import './backgrounds.pcss';
import bggreen from '../../../../source/images/bggreen.svg';
import bgblue from '../../../../source/images/bgblue.svg';
import yellowssc from '../../../../source/images/yellowssc.svg';
import peoples from '../../../../source/images/peoples.svg';
import greenMask from '../../../../source/images/green mask.png';
import orangeMask from '../../../../source/images/orange mask.png';
import blueMask from '../../../../source/images/blue mask.png';
import vector13 from '../../../../source/images/Vector13.svg';

const GreenBlue = () => (
  <div className='Backgroundcontainer-Wrap Wrap-Blue'>
    <img className='Backgroundcontainer-Green' src={bggreen} />
    <img className='Backgroundcontainer-Blue' src={bgblue} />
  </div>
);

const Blue = () => (
  <div className='Backgroundcontainer-Wrap Wrap-Blue'>
  </div>
);

const YellowLightYellow = () => (
  <div className='Backgroundcontainer-Wrap Wrap-Yellow'>
    <img className='Backgroundcontainer-Yellowssc' src={yellowssc} />
    <img className='Backgroundcontainer-Peoples' src={peoples} />
  </div>
);

const CurveBLue = () => (
  <div className='Backgroundcontainer-Wrap Wrap-Blue'>
    <img className='Backgroundcontainer-Greenmask' src={greenMask} />
    <img className='Backgroundcontainer-Bluemask' src={blueMask} />
  </div>
);

const CurveOrange = () => (
  <div className='Backgroundcontainer-Wrap Wrap-Blue'>
    <img className='Backgroundcontainer-Greenmask' src={orangeMask} />
    <img className='Backgroundcontainer-Bluemask' src={blueMask} />
  </div>
);

const CurveVectorBLue = () => (
  <div className='Backgroundcontainer-Wrap Wrap-Blue'>
    <img className='Backgroundcontainer-VectorbLuemask' src={vector13} />
  </div>
);
export const Backgrounds = {
  GreenBlue,
  Blue,
  YellowLightYellow,
  CurveBLue,
  CurveOrange,
  CurveVectorBLue,
};

