export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:5000/api'
		: ''

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern'
export const ADD_SKILL = 'ADD_SKILL'
export const SKILLS_LOADED_SUCCESS = 'SKILLS_LOADED_SUCCESS'
export const SKILLS_LOADED_FAIL = 'SKILLS_LOADED_FAIL'
export const DELETE_SKILL = 'DELETE_SKILL'
export const UPDATE_SKILL = 'UPDATE_SKILL'
export const FIND_SKILL = 'FIND_SKILL'




