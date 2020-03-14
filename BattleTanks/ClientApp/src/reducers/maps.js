import { GET_MAPS_PENDING, GET_MAPS, GET_MAPS_ERROR, GET_MAPS_SUCCESS} from '../actions/maps';
import initialState from '../store/initialState';

export const reducer = (
  state = initialState.maps,
  action
) => {
  switch (action.type) {

    case GET_MAPS_PENDING:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: null,
        isPending: true,
      });

    case GET_MAPS_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: true,
        isError: null,
        isPending: false,
      });

    case GET_MAPS_ERROR:
      return Object.assign({}, state, {
        isSuccess: false,
        isError: true,
        isPending: false,
      });

    case GET_MAPS:
      return Object.assign({}, state, {
        data: action.payload
      });

    default:
      return state;
  }
}