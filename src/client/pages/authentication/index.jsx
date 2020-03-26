import React from 'react';
import './authentication.pcss';
import { Regsidebar } from '../../components/regsidebar';
import { Regcontent } from '../../components/regcontent';
import { BrowserRouter } from 'react-router-dom';

export const Authentication = (props) => {
    return (
        <BrowserRouter>
            <div className='Authentication' >
                <Regsidebar />
                <Regcontent />
            </div>
        </BrowserRouter>
    )
}