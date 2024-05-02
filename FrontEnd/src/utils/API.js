const BASE_URL = "http://localhost:3003/api";

const API = {
  signUp: async (userData, { isLoading, error, sendRequest, clearError }) => {
    try {
      const response = await sendRequest(
        `${BASE_URL}/users/signup`,
        "POST",
        userData
      );
      return { isLoading, error, response, clearError };
    } catch (error) {
      return { isLoading, error, response: null, clearError };
    }
  },

  login: async (credentials, { isLoading, error, sendRequest, clearError }) => {
    console.log(credentials);
    try {
      const response = await sendRequest(
        `${BASE_URL}/users/login`,
        "POST",
        credentials
      );
      return { isLoading, error, response };
    } catch (error) {
      return { isLoading, error, response: null };
    }
  },
};

export default API;
