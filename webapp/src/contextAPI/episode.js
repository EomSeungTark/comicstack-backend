import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";
// import { defaultValue } from 'model/lecture.model';


const initialState = {
	error: false,
	loading: false,
	entities: [{
		episode: 0,
    episode_name: "",
		thumbnail_path: "",
		views: 0,
		toon_sid: 0,
		create_at: "",
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

const EpisodeListStateContext = createContext(initialState);
const EpisodeListDispatchcontext = createContext(null);

export function useStateEpisodeList() {
  return useContext(EpisodeListStateContext);
}

export function useDispatchEpisodeList() {
  return useContext(EpisodeListDispatchcontext);
}

export const EpisodeListProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EpisodeListStateContext.Provider value={state}>
      <EpisodeListDispatchcontext.Provider value={dispatch}>
        {children}
      </EpisodeListDispatchcontext.Provider>
    </EpisodeListStateContext.Provider>
  );
}

export async function getList(dispatch, toonId) {
  try {
    const response = await axios.post(
			"/api/toon/getepisodes", 
			{toon_sid: parseInt(toonId)}
		);
		
    console.log("get epidsode list ", response.data);
    if (response.data) {
      dispatch({ type: "GET_LIST", payload: response.data.episodes_info });
    }
  } catch (e) {
    //dispatch({ type: "GET_DATA_FAIL", error: e });
    console.log(e);
  }
}

