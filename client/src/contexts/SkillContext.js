import { createContext, useReducer, useState } from "react";
import { skillReducer } from "../reducers/skillReducer";
import {
  apiUrl,
  ADD_SKILL,
  SKILLS_LOADED_SUCCESS,
  SKILLS_LOADED_FAIL,
  DELETE_SKILL,
  UPDATE_SKILL,
  FIND_SKILL,
} from "./constants";
import axios from "axios";

export const SkillContext = createContext();

const SkillContextProvider = ({ children }) => {
  const [skillState, dispatch] = useReducer(skillReducer, {
    skill: null,
    skills: [],
    skillsLoading: true,
  });

  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showUpdateSkillModal, setShowUpdateSkillModal] = useState(false);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // Get All post
  const getSkills = async () => {
    try {
      const response = await axios.get(`${apiUrl}/skills`);
      if (response.data.success) {
        dispatch({
          type: SKILLS_LOADED_SUCCESS,
          payload: response.data.skills,
        });
      }
    } catch (error) {
      dispatch({
        type: SKILLS_LOADED_FAIL,
      });
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Add skill
  const addSkill = async (newSkill) => {
    try {
      const response = await axios.post(`${apiUrl}/skills`, newSkill);
      if (response.data.success) {
        dispatch({
          type: ADD_SKILL,
          payload: response.data.skill,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server Error" };
    }
  };

  // Find Skill has clicked
  const findSkill = (skillId) => {
    const skill = skillState.skills.find((skill) => skill._id === skillId);
    dispatch({
      type: FIND_SKILL,
      payload: skill,
    });
  };

  // update skill

  const updateSkill = async (updatedSkill) => {
    try {
      const response = await axios.put(
        `${apiUrl}/skills/${updatedSkill._id}`,
        updatedSkill
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_SKILL,
          payload: response.data.updatedSkill,
        });
        return response.data;
      }
    } catch (error) {}
  };

  // delete skill
  const deleteSkill = async (skillId) => {
    try {
      const response = await axios.delete(`${apiUrl}/skills/${skillId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_SKILL,
          payload: skillId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Skill context data

  const skillContextData = {
    skillState,
    getSkills,
    showAddSkillModal,
    setShowAddSkillModal,
    addSkill,
    showToast,
    setShowToast,
    deleteSkill,
    findSkill,
    updateSkill,
    showUpdateSkillModal,
    setShowUpdateSkillModal,
  };
  return (
    <SkillContext.Provider value={skillContextData}>
      {children}
    </SkillContext.Provider>
  );
};

export default SkillContextProvider;
