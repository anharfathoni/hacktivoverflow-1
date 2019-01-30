import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3000/'
  // baseURL: 'http://35.187.237.129:3000/'
})