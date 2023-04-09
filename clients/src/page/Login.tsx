import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Material Ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// Validate
import * as yup from 'yup';
import { useFormik } from 'formik';
// Api Login
import { useAppDispatch, useAppSelector } from '../app/hook';
import { selectAuth, login, reset, signIn } from '../feature/auth/authSlice';
// React Icons
import { SlLock } from 'react-icons/sl';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
// FIREBASE
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase/config';

import BannerLogin from '../assets/Bannerlogin.mp4';
import { iLoginUser } from '../feature/auth/authService';

export interface iPropsButton {
  className?: string;
  Icon: React.ElementType;
  name: string;
  onClick: () => void;
}

export interface iUser {
  _id: string;
  uid: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  fullName: string | null;
  photoUrl: string;
}

const theme = createTheme();

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at latest 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectAuth);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
    if (res.user) {
      const user = {
        _id: res.user.uid,
        fullName: res.user.displayName,
        photoUrl: res.user.photoURL,
        email: res.user.email,
      };

      const payload = {
        user,
        token: res.user.accessToken,
      };
      console.log(payload);
      dispatch(signIn(payload));
      navigate('/');
    }
  };

  const handleLoginWithFaceBook = async () => {
    const provider = new FacebookAuthProvider();

    const res = await signInWithPopup(auth, provider);
    console.log('res with facebook', res);
  };

  // useEffect(() => {
  //   const unsubcribed = auth.onIdTokenChanged((user) => {
  //     console.log('[From AuthProvider]', { user });
  //   });

  //   return () => {
  //     unsubcribed();
  //   };
  // }, [auth]);

  const handleLogin = async (userLogin: iLoginUser) => {
    const res = await dispatch(login(userLogin));
    console.log(res);
    if (res.payload.user) {
      navigate('/');
    } else {
      console.log('Login failure');
      dispatch(reset());
    }
  };

  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: handleLogin,
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <div className=''>
        <div className='relative w-full h-screen overflow-hidden'>
          <video
            src={BannerLogin}
            loop
            muted
            controls={false}
            autoPlay
            className='w-full h-full object-cover'
          />
          <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center flex-col bg-blackOverlay'>
            <div className='sm:w-[600px] w-[90%] h-[90%] mx-auto rounded-xl bg-white px-8 py-12'>
              <div className='w-full flex flex-col items-center'>
                <span className='bg-[#9c27b0] p-2 text-white font-semibold rounded-full'>
                  <SlLock />
                </span>
                <Typography component='h1' variant='h5'>
                  Sign in
                </Typography>
              </div>
              <div className=' mt-4'>
                <LoginWith
                  className={'bg-[#4267b2]'}
                  name={'Sign in with Facebook'}
                  Icon={FaFacebook}
                  onClick={handleLoginWithFaceBook}
                />
                <LoginWith
                  className={'bg-[#111] mt-6'}
                  name={'Sign in with Google'}
                  Icon={FcGoogle}
                  onClick={handleLoginWithGoogle}
                />
              </div>
              <h2 className='w-full text-center text-xl mt-4 text-gray-blur'>
                Or
              </h2>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box component='form' onSubmit={handleSubmit} noValidate>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <p className='text-red-500 w-full'>{errors.email}</p>
                  )}
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <p className='text-red-500 w-full'>{errors.password}</p>
                  )}
                  <FormControlLabel
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to='#' className='text-sm'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to='#' className='text-sm'>
                        <span>{`Don't have an account?`}</span>
                        <span className='text-blue-500'>Sign In</span>
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </ThemeProvider>
  );
};

export const LoginWith: React.FC<iPropsButton> = ({
  className,
  name,
  Icon,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center justify-between w-full text-white px-4 py-2 ${className}`}
      onClick={onClick}
    >
      <Icon className='sm:text-2xl' />
      <span className='sm:text-lg font-semibold'>{name}</span>
      <span></span>
    </button>
  );
};

export default Login;
