// api path base url

export const Base_URL = "https://interview.optimavaluepro.com/api";
export const API_ENDPOINT = "" //`${Base_URL}/v1`;

// api path
export const PATH = {
  auth: {
    login: `${API_ENDPOINT}/login`,
  },
  user: {
    userList: (url :string) => `${API_ENDPOINT}/user?${url}`,
    userDelete: (id :string) => `${API_ENDPOINT}/user/${id}`,
    userMultipleDelete: `${API_ENDPOINT}/user/`,
    createUser: `${API_ENDPOINT}/roles`,
    updateUser: (id: string) => `${API_ENDPOINT}/roles/${id}`,
    deleteUser: (id: string) => `${API_ENDPOINT}/roles/${id}`,
    showUser: (id: string) => `${API_ENDPOINT}/roles/${id}`,
  },

};
