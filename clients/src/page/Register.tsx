import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// Material Ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
// API
import { register, reset, selectAuth } from '../feature/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hook';
// Validation
import * as yup from 'yup';
import { useFormik } from 'formik';
// ReactIcons
import { SlLock } from 'react-icons/sl';
import { BsStarFill } from 'react-icons/bs';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { iRegisterUser } from '../feature/auth/authService';

const theme = createTheme();

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at latest 6 characters')
    .required('Password is required'),
  rePassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess } = useAppSelector(selectAuth);

  const handleRegister = async (userRegister: iRegisterUser) => {
    await dispatch(register(userRegister));
    if (isSuccess) {
      console.log('Register is SuccessFullly');
      dispatch(reset());
      navigate('/activate');
    } else {
      console.log('Register is Failure');
    }
  };

  const { errors, touched, handleBlur, handleChange, handleSubmit } = useFormik(
    {
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: '',
      },
      validationSchema,
      onSubmit: handleRegister,
    }
  );

  return (
    <ThemeProvider theme={theme}>
      <div className='flex items-center justify-center w-full h-screen bg-slate-200'>
        <div className='grid grid-cols-2 w-[90%] sm:w-80% lg:w-[70%] xl:w-[60%] h-[90%] md:h-[80%] bg-white rounded-xl'>
          <div className='md:col-span-1 col-span-2 p-10'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span className='bg-[#9c27b0] p-2 text-white font-semibold rounded-full'>
                <SlLock />
              </span>
              <Typography component='h1' variant='h5'>
                Sign up
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete='given-name'
                      name='firstName'
                      required
                      fullWidth
                      id='firstName'
                      label='First Name'
                      autoFocus
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    {errors.firstName && touched.firstName && (
                      <p className='text-red-500 w-full'>{errors.firstName}</p>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id='lastName'
                      label='Last Name'
                      name='lastName'
                      autoComplete='family-name'
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    {errors.lastName && touched.lastName && (
                      <p className='text-red-500 w-full'>{errors.lastName}</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id='email'
                      label='Email Address'
                      name='email'
                      autoComplete='email'
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    {errors.email && touched.email && (
                      <p className='text-red-500 w-full'>{errors.email}</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      autoComplete='new-password'
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    {errors.password && touched.password && (
                      <p className='text-red-500 w-full'>{errors.password}</p>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name='rePassword'
                      label='Confirm Password'
                      type='password'
                      id='rePassword'
                      autoComplete='new-password'
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    {errors.rePassword && touched.rePassword && (
                      <p className='text-red-500 w-full'>{errors.rePassword}</p>
                    )}
                  </Grid>
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Link href='#' variant='body2'>
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </div>
          <div className='relative overflow-hidden col-span-1 md:flex hidden'>
            <img
              className='w-full h-full rounded-tr-xl rounded-br-xl object-center '
              src='https://images.pexels.com/photos/6353749/pexels-photo-6353749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt=''
            />
            <div className='flex px-8 pb-10 absolute top-0 left-0 right-0 bottom-0 text-white'>
              <div className='flex flex-col justify-end'>
                <Typography
                  component='h1'
                  variant='h4'
                  color={'white'}
                  className='font-bold'
                >
                  {`A grocery delivery service that doesn’t hurt your wallet`}
                </Typography>
                <div className='flex justify-between items-center my-4'>
                  <Typography
                    component='h1'
                    variant='h5'
                    color={'white'}
                    className='font-bold'
                  >
                    Olivia
                  </Typography>
                  <div className='flex gap-1'>
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <Typography gutterBottom variant='h6' component='div'>
                      Thua Thien Hue, Hue
                    </Typography>
                    <Typography variant='body2'>142 Long Ho</Typography>
                  </div>
                  <div className='flex gap-4'>
                    <span className='p-2 rounded-full border border-white cursor-pointer'>
                      <AiOutlineArrowLeft />
                    </span>
                    <span className='p-2 rounded-full border border-white cursor-pointer'>
                      <AiOutlineArrowRight />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Register;
