import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import AuthenticationService from "../../api/AuthenticationService";
import * as JWT from 'jwt-decode'

class AuthLink extends Component{
    render() {
        if (this.props.to === "/login" || this.props.to === "/register"){
            if (!AuthenticationService.isUserLoggedIn()) {
                return <NavLink {...this.props}/>
            }
            return <></>
        }

        if (AuthenticationService.isUserLoggedIn()){
            //Obtain the list of authorities from JWT
            let jwtAuthorities = JSON.parse(JWT(AuthenticationService.getAuthenticationToken()).authorities)
            //Verify if the jwtAuthorities and roles send by props have match
            let match = jwtAuthorities.some(a => this.props.roles.some(s => s === a.authority))
            //Validates Match
            if (match){
                return <NavLink {...this.props}/>
            }else {
                return <></>
            }
        }else {
            return <></>
        }
    }
}

export default AuthLink