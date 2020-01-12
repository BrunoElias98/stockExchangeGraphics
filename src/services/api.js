import axios from 'axios'

const api = axios.create({
  baseURL : 'https://financialmodelingprep.com/api/v3'
})

export default api