import {FETCH_OBJECTS_FAILURE, FETCH_OBJECTS_START, FETCH_OBJECTS_SUCCESS} from "../../constats/types";
import vozillaService from '../services/vozilla'

export const getObjects = filters => async dispatch => {
  dispatch({type: FETCH_OBJECTS_START})
  try {
    const res = await vozillaService.fetchObjects(filters)
    dispatch({type: FETCH_OBJECTS_SUCCESS, payload: res.data})
  } catch (error) {
    dispatch({type: FETCH_OBJECTS_FAILURE})
    console.log(error)
  }
}
