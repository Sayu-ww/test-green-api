import { Constants } from '@shared/lib'
import axios from 'axios'

const baseClient = axios.create({
  baseURL: Constants.BASE_API_URL,
})

export { baseClient }
