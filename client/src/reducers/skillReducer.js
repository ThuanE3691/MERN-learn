export const skillReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SKILLS_LOADED_SUCCESS":
      return {
        ...state,
        skills: payload,
        skillLoading: false,
      };
    case "SKILLS_LOADED_FAIL":
      return {
        ...state,
        skills: [],
        skillLoading: false,
      };
    default:
      return state;
  }
};
