import React, {Component} from 'react'
import AuthenticationService from "../../api/AuthenticationService";
import * as JWT from 'jwt-decode'

class AuthSideList extends Component{
    render() {

        if (AuthenticationService.isUserLoggedIn()){
            //Obtain the list of authorities from JWT
            let jwtAuthorities = JSON.parse(JWT(AuthenticationService.getAuthenticationToken()).authorities)
            //Verify if the jwtAuthorities and roles send by props have match
            let match = jwtAuthorities.some(a => this.props.roles.some(s => s === a.authority))
            //Validates Match
            if (match){
                return (
                    <div className="list-group-root">
                        <a href={"#"+this.props.list} className="list-group-item list-group-item-action" data-toggle="collapse">
                            <i className="fas fa-chevron-right float-left"></i>{this.props.title}
                        </a>
                        <div className="list-group collapse" id={this.props.list}>
                            {this.props.children}
                        </div>
                    </div>
                )
            }else {
                return <></>
            }
        }else {
            return <></>
        }
    }
}

export default AuthSideList