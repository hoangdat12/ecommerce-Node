import _User from "../model/User.js";

class userService {
  static getUser = async ({ userId, res }) => {};

  static isUserExist = async ({ userId }) => {
    const userExist = await _User.findById({ _id: userId });
    if (!userExist)
      return {
        code: 400,
        message: "Not found!",
      };
  };
}

export default userService;
