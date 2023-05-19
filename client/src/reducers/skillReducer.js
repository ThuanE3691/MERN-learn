import {
  ADD_SKILL,
  SKILLS_LOADED_SUCCESS,
  SKILLS_LOADED_FAIL,
  DELETE_SKILL,
  UPDATE_SKILL,
  FIND_SKILL
} from "../contexts/constants";
export const skillReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SKILLS_LOADED_SUCCESS:
      return {
        ...state,
        skills: payload,
        skillLoading: false,
      };
    case SKILLS_LOADED_FAIL:
      return {
        ...state,
        skills: [],
        skillLoading: false,
      };
    case ADD_SKILL:
      return {
        ...state,
        skills: [...state.skills, payload],
        skillLoading: false,
      };
    case DELETE_SKILL:
      return {
        ...state,
        skills: state.skills.filter((skill) => skill._id !== payload),
        skillLoading: false,
      };
    
    case FIND_SKILL:
      return {
        ...state,
        skill: payload,
      }
    case UPDATE_SKILL:
        const newSkills = state.skills.map(skill => skill._id === payload._id ? payload : skill)
        return {
          ...state,
          skills: newSkills,
          skillLoading: false,
        };
    
    default:
      return state;
  }
};
