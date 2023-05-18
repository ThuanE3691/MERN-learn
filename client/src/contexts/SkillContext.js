import { createContext, useReducer } from "react";
import { skillReducer } from "../reducers/skillReducer";
import { apiUrl } from "./constants";
import axios from "axios";

export const SkillContext = createContext();

const SkillContextProvider = ({ children }) => {
  const [skillState, dispatch] = useReducer(skillReducer, {
    skills: [],
    skillsLoading: true,
  });

  // Get All post
  const getSkills = async () => {
    try {
      const response = await axios.get(`${apiUrl}/skills`);
      if (response.data.success) {
        dispatch({
          type: "SKILLS_LOADED_SUCCESS",
          payload: response.data.skills,
        });
      }
    } catch (error) {
        dispatch({
            type: "SKILLS_LOADED_FAIL"
        });
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Skill context data

  const skillContextData = {skillState, getSkills};
  return (
    <SkillContext.Provider value={skillContextData}>
      {children}
    </SkillContext.Provider>
  );
};

export default SkillContextProvider;
