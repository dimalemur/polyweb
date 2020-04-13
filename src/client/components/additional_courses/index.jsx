import React, { useEffect, useState } from 'react';
import './additional_courses.pcss';
import { connect } from 'react-redux';

const Additionalcourses = (props) => (
  <div className='Additionalcourses'>
  </div>
);

export default connect(
  (state) => ({
    state,
  }),
)(Additionalcourses);
