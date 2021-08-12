import React, { useReducer, useContext, createContext } from "react";
import axios from "axios";
// import { defaultValue } from 'model/lecture.model';


const initialState = {
	error: false,
	loading: false,
	entity: {
		thumbnail_path: "",
		toon_context: [],
		usercomments: [{
			user_id: "",
			commnet: "",
			good: 0,
			bad: 0
		}]
	},
}


function reducer(state, action) {
  switch (action.type) {
    case "GET_EPISODE_IMAGE":
      return {
        ...state,
        entity: action.payload,
				loading: true
      };
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

const EpisodeImageStateContext = createContext(initialState);
const EpisodeImageDispatchcontext = createContext(null);

export function useStateEpisodeImage() {
  return useContext(EpisodeImageStateContext);
}

export function useDispatchEpisodeImage() {
  return useContext(EpisodeImageDispatchcontext);
}

export const EpisodeImageProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EpisodeImageStateContext.Provider value={state}>
      <EpisodeImageDispatchcontext.Provider value={dispatch}>
        {children}
      </EpisodeImageDispatchcontext.Provider>
    </EpisodeImageStateContext.Provider>
  );
}

export async function getEpisodeImage(dispatch, toonId, episodeName) {
  try {
    const response = await axios.post(
			"/api/toon/dotoon", 
			{
				user_id: "",
				toon_sid: parseInt(toonId),
				episode_name: episodeName,
			}
		);
		
    console.log("get epidsode image ", response.data);
    if (response.data) {
      dispatch({ type: "GET_EPISODE_IMAGE", payload: response.data });
    }
  } catch (e) {
    //dispatch({ type: "GET_DATA_FAIL", error: e });
    console.log(e);
  }
}

