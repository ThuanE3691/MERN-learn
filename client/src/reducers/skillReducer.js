import {  ADD_SKILL, SKILLS_LOADED_SUCCESS, SKILLS_LOADED_FAIL } from "../contexts/constants";
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
          skills: [...state.skills,payload],
          skillLoading: false,
        };
    default:
      return state;
  }
};
