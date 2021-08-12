import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";


const initialState = {
	error: false,
	loading: false,
	entity: {
		user_id: "",
		password: "",
		address: "",
		phone_number: "",
		persnal_basic_agree: false,
		persnal_share_agree: false,
		email: "",
		sms_agree: false,
		email_agree: false,
		name: "",
    status: false,
	},
  signinLoading: false,
  signin: false,
  idCheckLoading: false,
  idCheck: false,
  loginLoading: false,
  login: false,
}


function reducer(state, action) {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        // signin: action.data,
				signinloading: true
      };
    case "ID_CHECK":
      return {
        ...state,
        idCheck: action.idCheck,
				idCheckLoading: true
      };
    case "LOGIN":
      return {
        ...state,
        login: action.login,
        entity: action.entity,
				loginLoading: true
      };
    case "LOGOUT":
      return {
        ...initialState
      };
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

const UserStateContext = createContext();
const UserDispatchcontext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchcontext.Provider value={dispatch}>
        {children}
      </UserDispatchcontext.Provider>
    </UserStateContext.Provider>
  );
}

export function useStateUser() {
  return useContext(UserStateContext);
}

export function useDispatchUser() {
  return useContext(UserDispatchcontext);
}

export async function signinUser(dispatch, userInfo) {
  try {
    const response = await axios.post(
      "/api/signin",
			userInfo  //json object?
    );
    console.log("res data", response.data);
    if (response.data) {
      dispatch({ type: "SIGNIN" });
    }
    return response.data;
  } catch (e) {
    //dispatch({ type: "GET_DATA_FAIL", error: e });
    console.log(e);
  }
}

export async function idCheck(dispatch, user_id){
  try {
    const response = await axios.post(
      "/api/idcheck",
      { user_id }
    )
    console.log("res data", response.data);
    if(response.data){
      dispatch({ type: "ID_CHECK", idCheck: response.data.status })
    }
  } catch (e) {
    console.log(e);
  }
}

export async function loginCheck(dispatch, user_id, password){
  try {
    const response = await axios.post(
      "/api/login",
      { user_id, password }
    )
    console.log("login check = ", response);
    if(response.data){
      dispatch({ type: "LOGIN", login: response.data.status, entity: response.data })
    }
    return response.data
  } catch (e) {
    console.log(e);
  }
}

export function logout(dispatch){
  dispatch({ type: "LOGOUT" })
}



function formattingDateTostring(date) {
  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;
  return year + "-" + month + "-" + day;
}
