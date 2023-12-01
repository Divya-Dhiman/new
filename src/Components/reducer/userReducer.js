import * as actionTypes from '../action/userActionType';

const initialState = {
  submittedData: null,
  data: [],
  loading: false,
  error: null,
  user:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_REQUEST:
      case actionTypes.UPDATE_USER_REQUEST:
        case actionTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_DATA_SUCCESS:
      case actionTypes.SUBMIT_FORM_SUCCESS:
        case actionTypes.DELETE_USER_SUCCESS:
          case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        submittedData: action.payload,
        error: null,
        
        
      };
      
     
      
    case actionTypes.FETCH_DATA_FAILURE:
      case actionTypes.SUBMIT_FORM_FAILURE:
        case actionTypes.UPDATE_USER_FAILURE:
          case actionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
        submittedData: null,
      };
    default:
      return state;
  }
};

export default reducer;
