import {FETCH_VEHICLES_FAILURE, FETCH_VEHICLES_START, FETCH_VEHICLES_SUCCESS} from "../../constats/types";

const initialState = {
  vehicles: {
    isLoading: false,
    isEmpty: true,
    data: {}
  }
}

const vozillaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VEHICLES_START:
      return {
        ...state,
        vehicles: {
          isLoading: true
        }
      }

    case FETCH_VEHICLES_SUCCESS:
      return {
        ...state,
        vehicles: {
          isLoading: false,
          isEmpty: false,
          data: action.payload.objects
        }
      }

    case FETCH_VEHICLES_FAILURE:
      return {
        ...state,
        vehicles: {
          isLoading: false,
          isEmpty: false,
          data: {}
        }
      }

    default:
      return state
  }
}

export default vozillaReducer
