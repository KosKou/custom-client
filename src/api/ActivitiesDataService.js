import axios from 'axios'
import { API_URL } from './Constants'

class ActivitiesDataService {

    retrieveAllActivities(){
        return axios.get(`${API_URL}/activities`);
    }

    retrieveEverActivities(){
      return axios.get(`${API_URL}/activities/all`);
    }

    retrieveActivity(id){
        return axios.get(`${API_URL}/activities/${id}`);
    }

    createActivity(activity){
        return axios.post(`${API_URL}/activities`, activity);
    }

    updateActivity(id, activity){
        return axios.put(`${API_URL}/activities/${id}`, activity);
    }

    deleteActivity(id){
        return axios.delete(`${API_URL}/activities/${id}`);
    }

    updateSpecialist(id, specialist){
        return axios.put(`${API_URL}/activities/${id}/specialist/${specialist}`);
    }

}
export default new ActivitiesDataService()
