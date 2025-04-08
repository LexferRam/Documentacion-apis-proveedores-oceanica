import axios from "axios";

export const login = async (p_portal_username, p_pwd) => {
  console.log("entroooooo");
  try {
    const response = await axios.post(
      "https://oceanicadeseguros.com/asg-api/login",
      {
        p_portal_username: p_portal_username,
        p_pwd: p_pwd,
      }
    );

    console.log("1111", response.data);

    return response.data;
  } catch (error) {
    console.log("error");
    return error;
  }
};

//   try {
//     const response = await axios.post(`${API_URL}/logout`);
//     return response.data;
//   } catch (error) {
//     console.error('Error al cerrar sesión:', error.response?.data || error.message);
//     throw error;
//   }
// };

// export const isAuthenticated = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/check-auth`);
//     return response.data.authenticated;
//   } catch (error) {
//     console.error('Error al verificar la autenticación:', error.response?.data || error.message);
//     return false;
//   }
// };
