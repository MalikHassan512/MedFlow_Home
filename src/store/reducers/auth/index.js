import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, SET_USER_DATA } from '../../actions/types';

const initialState = {
  userData: null,
  errorMessage: 'this is a test message',
  isLoading: false,
  
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        
      }

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userData : action.data

      }

    case SIGN_UP_FAILURE:
      return {
        ...state,
      }

      

    case 'TEST_CHECK':
      return {
        ...state,
        errorMessage: 'checking reducer working',
      };

    default:
      return state;
  }
};

export default authReducer;
