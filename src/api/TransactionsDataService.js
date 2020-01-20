// http://localhost:8080/api/transactions

import axios from 'axios'
import { API_URL } from './Constants'

class TransactionsDataService {
  executeTransaction(transaction){
    return axios.post(`${API_URL}/transactions`,transaction);
  }
}

export default new TransactionsDataService()
