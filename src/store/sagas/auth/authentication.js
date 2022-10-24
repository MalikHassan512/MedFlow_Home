import Auth from "@aws-amplify/auth";
import { put, takeEvery } from "@redux-saga/core/effects";
import { SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../../actions/types";


function* signUpAuthUser(payload) {
    try {

        console.log("prrrr" , payload.payload, '=====', payload.userName, '\n\n', payload)
    const signUp = yield Auth.signUp({
        username: payload.userName,
        password: payload.password,
        attributes: payload.payload,
      });

      console.log("printSignUp -- > " , signUp)
      yield put({
        type: SIGN_UP_SUCCESS,
        data: signUp,
      });
     }  catch (error) {
         console.log("signUpError == > " , error)
        yield put({
          type: SIGN_UP_FAILURE,
          error,
        });
      }
}

function* dataSaga(action) {
    console.log('2222222',action)
    yield takeEvery(SIGN_UP_REQUEST, signUpAuthUser);

  }
  
  export default dataSaga;