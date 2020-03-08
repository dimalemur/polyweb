import React from 'react'
import './main.pcss'
import {Header} from '../../components/header'
import {Navbar} from '../../components/navbar'

export const Main = (props) => {
    return (
        <div className = 'Main' >
            <Navbar />
            <Header />
        </div>
    )
}