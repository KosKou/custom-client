import axios from 'axios'
import { API_URL } from './Constants'

class WalletsDataService {
  retrieveWalletsByUser(user){
    return axios.get(`${API_URL}/wallets/${user}`);
  }

  retrieveWalletsById(id){
    return axios.get(`${API_URL}/wallets/u/${id}`);
  }
}

export default new WalletsDataService()
