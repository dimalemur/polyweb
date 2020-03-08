import React from 'react'
import './header.pcss'
import circle from '../../../source/images/big.svg'

export const Header = (props) => {
    return (
        <div className='Header' >
            <div className="Header-Content Content">
                <div className="Content-Name Name">
                    веб-студия <br /> POLYWEB <br /> AGENCY
                </div>
            </div>

            <div className="Header-Back Back">
            </div>

            <div className="Circle-Wrap">
                <div className="Circle Header-Circle">
                    <div className="Circle-First">
                        <img src={circle} alt="" />
                        <div className="Circle-Second">
                            <img src={circle} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}