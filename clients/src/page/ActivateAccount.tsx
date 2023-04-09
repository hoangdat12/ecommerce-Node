import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const ActivateAccount = () => {
  return (
    <div className='w-[80%] m-auto mt-24'>
      <Typography variant='h3' component='h1' textAlign='center'>
        We have sent to your email a link to activate your account, please
        follow to activate your account.
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}
      >
        <Link
          to='/login'
          className='py-2 px-8 text-2xl font-semibold border rounded-lg hover:bg-black hover:text-white duration-300'
        >
          Login Now
        </Link>
      </Box>
    </div>
  );
};

export default ActivateAccount;
