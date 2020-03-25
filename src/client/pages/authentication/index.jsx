import React from 'react';
import './authentication.pcss';
import { Regsidebar } from '../../components/regsidebar';
import { Regbackground } from '../../components/regbackground';
import { Authorization } from '../../components/authorization';

export const Authentication = (props) => {
    return (
        <div className='Authentication' >
            <Regsidebar />
            <Regbackground />
        </div>
    )
}