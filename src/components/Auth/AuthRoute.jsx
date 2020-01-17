import React, {Component} from 'react'
import AuthenticationService from "../../api/AuthenticationService";
import {Route, Redirect} from "react-router-dom";
import * as JWT from 'jwt-decode'

class AuthRoute extends Component{
    render() {
        if (this.props.path === "/login" || this.props.path === "/register"){
            if (AuthenticationService.isUserLoggedIn()) {
                return <Redirect to="/"/>
            }
            return <Route {...this.props}/>
        }

        if (AuthenticationService.isUserLoggedIn()){
            //Obtain the list of authorities from JWT
            let jwtAuthorities = JSON.parse(JWT(AuthenticationService.getAuthenticationToken()).authorities)
            //Verify if the jwtAuthorities and roles send by props have match
            let match = jwtAuthorities.some(a => this.props.roles.some(s => s === a.authority))
            //Validates Match
            if (match){
                return <Route {...this.props}/>
            }else{
                return <Redirect to="/"/>
            }
        }else {
            return <Redirect to="/login"/>
        }
    }
}

export default AuthRoute
