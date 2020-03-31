import react, { Component } from 'react'

export const authRedirect = (component) => {
    class RedirectComponent extends Component {
        render() {
            if (!window.localStorage.getItem('polyUser')) { //если нет токена в localStorage
                return <Redirect to = '/' />
            }
            return {
                RedirectComponent
            }
        }
    }
}