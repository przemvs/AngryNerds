/* eslint-disable */
import axios from 'axios'

let baseURL = 'https://dev.vozilla.pl/api-client-portal/'

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
