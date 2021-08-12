import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";
// import { defaultValue } from 'model/lecture.model';


const initialState = {
	error: false,
	loading: false,
	entities: [{
    user_id: "",
    day: "",
    title: "",
    thumbnail_path: "",
    context: "",
    toon_sid: 0,
  }],
}


function reducer(state, action) {
  switch (action.type) {
    case "GET_LIST":
      return {
        ...state,
        entities: action.payload,
				loading: true
      };
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

const ComicsListStateContext = createContext(initialState);
const ComicsListDispatchcontext = createContext(null);

export function useStateComicsList() {
  return useContext(ComicsListStateContext);
}

export function useDispatchComicsList() {
  return useContext(ComicsListDispatchcontext);
}

export const ComicsListProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ComicsListStateContext.Provider value={state}>
      <ComicsListDispatchcontext.Provider value={dispatch}>
        {children}
      </ComicsListDispatchcontext.Provider>
    </ComicsListStateContext.Provider>
  );
}

export async function getList(dispatch) {
  try {
    const response = await axios.get("/api/toon/gettoons");
		
    console.log("get comic list ", response.data);
    if (response.data) {
      dispatch({ type: "GET_LIST", payload: response.data.toons });
    }
  } catch (e) {
    //dispatch({ type: "GET_DATA_FAIL", error: e });
    console.log(e);
  }
}

