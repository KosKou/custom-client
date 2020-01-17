import axios from 'axios'
import { API_URL } from './Constants'

class OfferService {

    retrieveAllOffer(){
        return axios.get(`${API_URL}/offers`);
    }

    retrieveAllOffersByActivity(id){
        return axios.get(`${API_URL}/offers/activity/${id}`);
    }

    createOffer(offer){
        return axios.post(`${API_URL}/offers`, offer);
    }

    userOffered(offer){
        return axios.post(`${API_URL}/userOffered`, offer);
    }

    deleteOffer(offer){
      return axios.post(`${API_URL}/offers/delete`, offer)
    }
}
export default new OfferService()
