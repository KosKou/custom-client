import axios from 'axios'
import { API_URL } from './Constants'
import * as JWT from "jwt-decode";


export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const TOKEN_SESSION_ATTRIBUTE_NAME = 'authenticatedToken'

class AuthenticationService {

    executeAuthenticationService(username, password){
        let user = {
            email: username,
            password: password
        }
        return axios.post(`${API_URL}/login`, user)
    }

    createBearerAuthToken(token){
        return 'Bearer '+ token;
    }

    registerSuccessfulLogin(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, this.createBearerAuthToken(token));
        this.setupAxiosInterceptor(this.createBearerAuthToken(token))
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(TOKEN_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user===null){
            return false
        }
        return true
    }

    getAuthenticationToken(){
        let token = sessionStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
        if (token===null){
            return ''
        }
        return token
    }

    getAuthenticatedUser(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user===null){
            return ''
        }
        return user
    }

    getAuthRoles(){
        let jwtAuthorities = JSON.parse(JWT(this.getAuthenticationToken()).authorities)
        return jwtAuthorities;
    }

    isThisRole(role){
        let val = this.getAuthRoles().some(r => r.authority === role)
        return val;
    }

    setupAxiosInterceptor(token){
            axios.interceptors.request.use(
                (request) => {
                    if (this.isUserLoggedIn()){
                        request.headers.authorization = token
                    }
                    return request
                },
                (error => {
                    console.log("Error en el Interceptor")
                    console.log(error)
                })
            )
        }

    refreshAxiosInterceptor(){
        axios.interceptors.request.use(
            (request) => {
                if (this.isUserLoggedIn()){
                    request.headers.authorization = this.getAuthenticationToken()
                }
                return request
            },
            (error => {
                console.log("Error en el Interceptor")
                console.log(error)
            })
        )
    }
}

export default new AuthenticationService()
