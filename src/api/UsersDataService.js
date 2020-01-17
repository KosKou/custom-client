import axios from 'axios'
import { API_URL } from './Constants'


class UsersDataService {

    retrieveAllUsers(){
        return axios.get(`${API_URL}/users`);
    }

    retrieveUser(id){
        return axios.get(`${API_URL}/users/${id}`);
    }

    retrieveUserByEmail(email){
        return axios.get(`${API_URL}/userExist/${email}`);
    }

    deleteUser(id){
        return axios.delete(`${API_URL}/users/${id}`);
    }

    updateUser(id, user){
        return axios.put(`${API_URL}/users/${id}`, user);
    }

    createUser(user){
        return axios.post(`${API_URL}/register`, user);
    }

    retrieveUserStates(){
        return axios.get(`${API_URL}/users/states`);
    }

    retrieveUserRoles(){
        return axios.get(`${API_URL}/roles`);
    }
}
export default new UsersDataService()