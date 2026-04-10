// API Configuration
// This file manages all API endpoints for the application
// It automatically switches between local and production based on environment

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_URL}/api/auth/login`,
  SIGNUP: `${API_URL}/api/auth/signup`,
  LOGOUT: `${API_URL}/api/users/logout`,

  // User endpoints
  GET_USERS: `${API_URL}/api/users`,
  DELETE_USER: (id) => `${API_URL}/api/users/${id}`,
  USER_LOGIN: (username) => `${API_URL}/api/users/login?username=${username}`,
  GET_USER_PROFILE: (id) => `${API_URL}/api/users/${id}/profile`,
  UPDATE_USER_PROFILE: (id) => `${API_URL}/api/users/${id}/profile`,

  // Admin endpoints
  GET_ADMINS: `${API_URL}/api/admins`,
  ADMIN_BY_USERNAME: (username) => `${API_URL}/api/admins/username/${username}`,
  GET_ADMIN_PROFILE: (id) => `${API_URL}/api/admins/${id}/profile`,
  UPDATE_ADMIN_PROFILE: (id) => `${API_URL}/api/admins/${id}/profile`,
  DELETE_ADMIN: (id) => `${API_URL}/api/admins/${id}`,

  // Course endpoints
  GET_COURSES: `${API_URL}/api/courses`,
  CREATE_COURSE: `${API_URL}/api/courses`,
  DELETE_COURSE: (id) => `${API_URL}/api/courses/${id}`,
  UPDATE_COURSE: (id) => `${API_URL}/api/courses/${id}`,

  // Feedback endpoints
  GET_FEEDBACK: `${API_URL}/api/feedback`,
  CREATE_FEEDBACK: `${API_URL}/api/feedback`,
  DELETE_FEEDBACK: (id) => `${API_URL}/api/feedback/${id}`,
  GET_USER_FEEDBACK: (userId) => `${API_URL}/api/feedback/user/${userId}`,

  // Feedback Form endpoints
  GET_FEEDBACK_FORM: `${API_URL}/api/feedback-form`,
  CREATE_FEEDBACK_FORM: `${API_URL}/api/feedback-form`,
};

export default API_ENDPOINTS;
