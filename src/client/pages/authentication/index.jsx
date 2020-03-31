import React from 'react';
import './authentication.pcss';
import { Regsidebar } from '../../components/regsidebar';
import { Regcontent } from '../../components/regcontent';

export const Authentication = (props) => {
    return (
            <div className='Authentication' >
                <Regsidebar />
                <Regcontent />
            </div>
    )
}