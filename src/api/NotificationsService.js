import axios from 'axios'
import { API_URL } from './Constants'

class NotificationsService {

  retrieveAllNotifications(owner){
    return axios.get(`${API_URL}/notifications/${owner}`);
  }

  updateNotification(notification){
    console.log(notification)
    return axios.put(`${API_URL}/notifications`, notification);
  }

}
export default new NotificationsService()
