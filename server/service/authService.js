import bcrypt from "bcrypt";

import _User from "../model/User.js";
import sendEmail, { sendEmailWithHTML } from "../helper/sendMail.js";
import client from "../helper/connectRedis.js";
import tokenService from "./tokenService.js";
import {
  changePasswordTemplate,
  activeAccontTemplete,
} from "../utils/emailTemplete.js";

class authService {
  static register = async ({ email, password, firstName, lastName }) => {
    // Hash password before save to database
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // Check user is Exist or not
    const isExist = await _User.findOne({ email: email });
    if (isExist)
      return {
        code: 400,
        message: "User is Exist in Ovial",
      };
    // Generate active token to send email for user active account
    const activationToken = await tokenService.generateActivationToken(email);
    // Send link active account to User
    sendEmail({
      email,
      contentSend: activeAccontTemplete({ activationToken }),
    });

    const newUser = {
      email,
      password: hashPassword,
      fullName: `${firstName} ${lastName}`,
      activationToken,
    };
    // Save user information into redis and set time expires in 30 minus
    client.set(email, JSON.stringify(newUser), "EX", 30 * 60);
    return {
      code: 201,
      message: "Register success!",
    };
  };

  static activeAccount = async (activationToken) => {
    // if there is no active token then return
    if (!activationToken) return false;
    // Verify active token
    const email = await tokenService.verifyActivationToken(activationToken);
    if (!email) return false;

    return new Promise((resolve, reject) => {
      client.get(email, (err, reply) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(JSON.parse(reply));
      });
    });
  };

  static login = async ({ email, password }) => {
    // Check user is Exist or not
    const user = await _User.findOne({ email });
    if (!user) {
      // If not exist, then check account is Active or not
      const isActive = await client.get(email);
      if (!isActive)
        return {
          code: 400,
          message: "Account is not active",
        };
      return {
        code: 400,
        message: `User with email: ${email} not found!`,
      };
    } else {
      // Validate password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid)
        return {
          code: 400,
          message: "Wrong password!",
        };
      // Create access token
      const accessToken = await tokenService.signAccessToken({
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      });
      // Create refresh token
      const refreshToken = await tokenService.signRefreshToken({
        userId: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      });

      return {
        code: 200,
        message: "Login success!",
        result: user,
        accessToken,
        refreshToken,
      };
    }
  };

  static forgetPassowrd = async ({ email, user }) => {
    if (user.email !== email)
      return {
        code: 400,
        message: "User not permission!",
      };
    const user = await _User.findOne({ email }).lean();
    if (!user)
      return {
        code: 404,
        message: "User not found!",
      };
    const tokenChange = tokenService.generateActivationToken(email);
    const verificationLink = `http://localhost:8080/auth/change-password/${tokenChange}`;
    sendEmailWithHTML({
      email,
      htmlContent: changePasswordTemplate({
        userEmail: email,
        verificationLink,
      }),
    });
    return {
      code: 200,
      message: "Success!",
    };
  };

  static changePasswordWithLink = async ({
    email,
    tokenChange,
    newPassword,
  }) => {
    if (!activationToken)
      return {
        code: 403,
        message: "Missing value!",
      };
    // Verify active token
    const email = await tokenService.verifyActivationToken(tokenChange);
    if (!email)
      return {
        code: 403,
        message: "Invalid token",
      };
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const updateUserPassword = await _User.findOneAndUpdate(
      { email },
      {
        password: hashPassword,
      }
    );
    if (!updateUserPassword) {
      return {
        code: 500,
        message: "DB error!",
      };
    } else
      return {
        code: 200,
        message: "Change password success!",
      };
  };
}

export default authService;
