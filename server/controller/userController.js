import _User from "../model/User.js";
import userService from "../service/userService.js";
import client from "../helper/connectRedis.js";

class userController {
  userService = new userService();

  static getUser = async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) return res.status(400).json({ message: "Missing user Id" });

      client.get(userId, async (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error!" });
        }
        if (data)
          return res.status(200).json({
            message: "Success!",
            data: JSON.parse(data),
          });
        else {
          const user = await _User.findOne({ _id: userId });
          if (!user)
            return res.status(500).json({
              message: "User not found",
            });
          else {
            res.status(200).json({
              message: "Success!",
              data: user,
            });
            const random = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
            client.set(userId, JSON.stringify(user), "EX", 600 + random);
          }
        }
      });

      // return res.status(code).json({ message, result });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error!" });
    }
  };

  static getAllUser = async (req, res) => {
    try {
      const users = await _User.find();
      return res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error!" });
    }
  };
}

export default userController;
