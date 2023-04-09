import useAxios from '../../hook/useAxios';

export interface iRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface iLoginUser {
  email: string;
  password: string;
}

const register = async (userRegister: iRegisterUser) => {
  const res = await useAxios.post('/auth/register', userRegister);
  if (res.status === 200) {
    return res.data;
  }
  return res;
};

const login = async (userLogin: iLoginUser) => {
  const res = await useAxios.post('/auth/login', userLogin);

  if (res.status === 200) {
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', JSON.stringify(res.data.token));
    return res.data;
  }

  return res;
};

const refreshToken = async () => {
  try {
    // Send request to refresh token endpoint
    const res = await useAxios.get('/auth/refreshToken');
    // save new token in local storage
    console.log(res);
    if (res.status === 200) {
      localStorage.setItem('token', res.data.token);
      return res.data.token;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const authService = {
  register,
  login,
  refreshToken,
};
export default authService;
