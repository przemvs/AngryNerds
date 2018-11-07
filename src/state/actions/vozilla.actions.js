import {FETCH_VEHICLES_FAILURE, FETCH_VEHICLES_START, FETCH_VEHICLES_SUCCESS} from "../../constats/types";
import vozillaService from '../services/vozilla'

export const getVehicles = () => async dispatch => {
  dispatch({type: FETCH_VEHICLES_START})
  try {
    const res = await vozillaService.fetchVehicles()
    dispatch({type: FETCH_VEHICLES_SUCCESS, payload: res.data})
  } catch (error) {
    dispatch({type: FETCH_VEHICLES_FAILURE})
    console.log(error)
  }
}
