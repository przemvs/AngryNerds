import api from './api'

class VozillaService {
  fetchVehicles = async () => api.get(`/map?objectType=VEHICLE`)
}

export default new VozillaService()
