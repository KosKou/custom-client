import axios from 'axios'
import { API_URL } from './Constants'

class AreaKnowledgeService {

    retrieveAllAreaKnowledge(){
        return axios.get(`${API_URL}/knownAreas`);
    }

    retrieveAreaKnowledge(id){
        return axios.get(`${API_URL}/knownAreas/${id}`);
    }

    createAreaKnowledge(knownArea){
        return axios.post(`${API_URL}/knownAreas`, knownArea);
    }

    updateAreaKnowledge(id, knownArea){
        return axios.put(`${API_URL}/knownAreas/${id}`, knownArea);
    }

    deleteAreaKnowledge(id){
        return axios.delete(`${API_URL}/knownAreas/${id}`);
    }
}
export default new AreaKnowledgeService()
