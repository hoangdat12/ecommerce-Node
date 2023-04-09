import hdPayService from "../service/hdPayService.js";

class hdPayController {
  static createHdPayOfUser = async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "Missing value!" });
      }
      const { code, message, result } = await hdPayService.createHdpayOfUser({
        userId,
      });
      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log("hdPayController::::Error::::", err);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  static addMoneyToAccount = async (req, res) => {
    try {
      const { userId, hdPayId, amount } = req.body;
      if (!userId || !hdPayId || !amount) {
        return res.status(400).json({ message: "Missing value!" });
      }
      const { code, message, result } = await hdPayService.addMoneyToAccount({
        userId,
        hdPayId,
        amount: parseFloat(amount),
      });
      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log("hdPayController::::Error::::", err);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  static transferMoney = async (req, res) => {
    try {
      const { senderId, receiverId, amount } = req.body;
      if (!senderId || !receiverId || !amount) {
        return res.status(400).json({ message: "Missing value!" });
      }
      const { code, message, result } = await hdPayService.transferAmount({
        senderId,
        receiverId,
        amount: parseFloat(amount),
      });
      return res.status(code).json({ message, data: result });
    } catch (err) {
      console.log("hdPayController::::Error::::", err);
      return res.status(500).json({ message: "Server Error" });
    }
  };
}

export default hdPayController;
