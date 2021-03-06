import api from './api'

class VozillaService {
  fetchObjects = async filters => {
    const filteredUrl = filters.reduce((firstValue, secondValue) => {
      return `${firstValue}&${secondValue.field}=${secondValue.value}`
    }, '')

    return api.get(`/map?${filteredUrl}`)
  }
}

export default new VozillaService()
