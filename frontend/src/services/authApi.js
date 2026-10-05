import request from './api';

export const authApi = {
  // Admin Endpoints (http://localhost:5000/api/v1/create & /login)
  adminCreate: (data) =>
    request('/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  adminLogin: (data) =>
    request('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default authApi;
