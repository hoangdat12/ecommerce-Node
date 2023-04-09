import client from '../helper/connectRedis.js';
import _User from '../model/User.js';
import authService from '../service/authService.js';
import CartService from '../service/ecommerceService/CartService.js';

class authController {
  static register = async (req, res) => {
    try {
      const { email, password, rePassword, firstName, lastName } = req.body;
      // Check request body
      if (!email)
        return res.status(400).json({ message: 'Email field is Required!' });
      if (password !== rePassword)
        return res.status(400).json({ message: 'Confirm password not valid!' });

      const { code, message, result } = await authService.register({
        email,
        password,
        firstName,
        lastName,
      });

      return res.status(code).json({
        code,
        message,
        result,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error server!' });
    }
  };

  static activeAccount = async (req, res) => {
    try {
      // Get token active from params
      const { activationToken } = req.params;
      // If token is not Exist, then return
      if (!activationToken)
        return res.status(400).json({ message: 'Missing activetion Token!' });

      const user = await authService.activeAccount(activationToken);
      // If there is no user, then token not valid
      if (!user) return res.status(400).json({ message: 'Not Valid' });
      // Else then create new User
      const newUser = await _User.create(user);

      if (!newUser) return res.status(500).json({ message: 'Error!' });
      // Delete information for user in redis
      client.del(newUser.email);
      // Create new Cart for User
      CartService.createNewCart({ userId: newUser._id.toString() });

      return res.status(201).json({
        message: 'Activation success!',
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email)
        return res.status(400).json({ message: 'Email field is Required!' });
      if (!password)
        return res.status(400).json({ message: 'Password field is Required!' });

      const { code, message, result, accessToken, refreshToken } =
        await authService.login({
          email,
          password,
        });
      // Send refresh token to client through cookies
      res.cookie('jwt', refreshToken, {
        HttpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 100,
      });
      return res.status(code).json({
        message,
        user: result,
        token: accessToken,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  };
}

export default authController;
