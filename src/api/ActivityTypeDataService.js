import axios from 'axios'
import { API_URL } from './Constants'


class ActivityTypeDataService {

    retrieveAllActivityTypes(){
        return axios.get(`${API_URL}/activityTypes`);
    }

    retrieveActivityType(id){
        return axios.get(`${API_URL}/activityTypes/${id}`);
    }

    deleteActivityType(id){
        return axios.delete(`${API_URL}/activityTypes/${id}`);
    }

    updateActivityType(activityType){
        return axios.put(`${API_URL}/activityTypes`, activityType);
    }

    createActivityType(activityType){
        return axios.post(`${API_URL}/activityTypes`, activityType);
    }

}
export default new ActivityTypeDataService()