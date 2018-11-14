import {
  FETCH_OBJECTS_FAILURE,
  FETCH_OBJECTS_START,
  FETCH_OBJECTS_SUCCESS
} from '../../constats/types'

const initialState = {
  objects: {
    isLoading: false,
    isEmpty: true,
    data: {}
  }
}

const vozillaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OBJECTS_START:
      return {
        ...state,
        objects: {
          isLoading: true
        }
      }

    case FETCH_OBJECTS_SUCCESS:
      return {
        ...state,
        objects: {
          isLoading: false,
          isEmpty: false,
          data: action.payload
        }
      }

    case FETCH_OBJECTS_FAILURE:
      return {
        ...state,
        objects: {
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
