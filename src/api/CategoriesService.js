import axios from 'axios'
import { API_URL } from './Constants'

class CategoriesService {

    retrieveAllCategories(){
        return axios.get(`${API_URL}/specialistCategories`);
    }

    retrieveCategory(id){
        return axios.get(`${API_URL}/specialistCategories/${id}`);
    }

    createCategory(activity){
        return axios.post(`${API_URL}/specialistCategories`, activity);
    }

    updateCategory(id, activity){
        return axios.put(`${API_URL}/specialistCategories/${id}`, activity);
    }

    deleteCategory(id){
        return axios.delete(`${API_URL}/specialistCategories/${id}`);
    }
}
export default new CategoriesService()