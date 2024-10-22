import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Advertisements CRUD
export const getAdvertisements = () => axios.get(`${API_URL}/advertisements`);
export const getAdvertisement = (id) => axios.get(`${API_URL}/advertisements/${id}`);
export const createAdvertisement = (data) => axios.post(`${API_URL}/advertisements`, data);
export const updateAdvertisement = (id, data) => axios.put(`${API_URL}/advertisements/${id}`, data);
export const deleteAdvertisement = (id) => axios.delete(`${API_URL}/advertisements/${id}`);

// Categories CRUD
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);
export const updateCategory = (id, data) => axios.put(`${API_URL}/categories/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API_URL}/categories/${id}`);

// Comments CRUD
export const getComments = () => axios.get(`${API_URL}/comments`);
export const createComment = (data) => axios.post(`${API_URL}/comments`, data);
export const updateComment = (id, data) => axios.put(`${API_URL}/comments/${id}`, data);
export const deleteComment = (id) => axios.delete(`${API_URL}/comments/${id}`);

// Users CRUD
export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (data) => axios.post(`${API_URL}/users`, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// Roles CRUD
export const getRoles = () => axios.get(`${API_URL}/roles`);
export const createRole = (data) => axios.post(`${API_URL}/roles`, data);
export const updateRole = (id, data) => axios.put(`${API_URL}/roles/${id}`, data);
export const deleteRole = (id) => axios.delete(`${API_URL}/roles/${id}`);

// Role_User CRUD
export const getRoleUsers = () => axios.get(`${API_URL}/role_user`);
export const createRoleUser = (data) => axios.post(`${API_URL}/role_user`, data);
export const deleteRoleUser = (id) => axios.delete(`${API_URL}/role_user/${id}`);
