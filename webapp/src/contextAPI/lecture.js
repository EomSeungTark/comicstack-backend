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

const LectureListStateContext = createContext(initialState);
const LectureListDispatchcontext = createContext(null);

export function useStateLectureList() {
  return useContext(LectureListStateContext);
}

export function useDispatchLectureList() {
  return useContext(LectureListDispatchcontext);
}

export const LectureListProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LectureListStateContext.Provider value={state}>
      <LectureListDispatchcontext.Provider value={dispatch}>
        {children}
      </LectureListDispatchcontext.Provider>
    </LectureListStateContext.Provider>
  );
}

export async function getList(dispatch, userId) {
  try {
    const response = await axios.post(
      "/api/toon/getmytoon",
			{ user_id: userId } //json object?
    );
    console.log("get my toon list ", userId, response.data);
    if (response.data) {
      dispatch({ type: "GET_LIST", payload: response.data.toons });
    }
  } catch (e) {
    //dispatch({ type: "GET_DATA_FAIL", error: e });
    console.log(e);
  }
}

