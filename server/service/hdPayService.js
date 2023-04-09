import _HDpay from "../model/HDpay.js";
import _User from "../model/User.js";
import { startSession } from "mongoose";

class hdPayService {
  static createHdpayOfUser = async ({ userId }) => {
    const hdPay = await _HDpay.create({ userId });
    if (!hdPay)
      return {
        code: 500,
        message: "Error!",
      };
    else
      return {
        code: 200,
        message: "Create success!",
      };
  };

  static addMoneyToAccount = async ({ userId, hdPayId, amount }) => {
    const userExist = await _User.findById({ _id: userId });
    if (!userExist)
      return {
        code: 400,
        message: "Not found!",
      };

    const wallet = await _HDpay.findOne({ _id: hdPayId, userId });
    if (!wallet)
      return {
        code: 400,
        message: "Not found!",
      };

    await _HDpay.findOneAndUpdate(
      { _id: hdPayId, userId },
      {
        $inc: {
          amount: +amount,
        },
      },
      {
        new: true,
      }
    );
    return {
      code: 200,
      message: `Add ${amount} Money to account`,
    };
  };
  static transferAmountTransaction = async ({
    senderId,
    receiverId,
    amount,
  }) => {
    const session = await startSession();
    session.startTransaction();
    try {
      // Decrease the sender's balance
      const sender = await _HDpay.findOneAndUpdate(
        { _id: senderId, balance: { $gte: amount } },
        { $inc: { balance: -amount } },
        { session, new: true }
      );
      if (!sender)
        return {
          code: 500,
          message: "Sender does not have sufficient funds",
        };

      await _HDpay.updateOne(
        { _id: receiverId },
        { $inc: { balance: amount } },
        { session, new: true }
      );

      // Increase the receiver's balance
      await session.commitTransaction();
      return {
        code: 200,
        message: "Success!",
      };
    } catch (error) {
      // Abort the transaction
      await session.abortTransaction();
      console.log(error);
      return {
        code: 500,
        message: "Error!",
      };
    } finally {
      session.endSession();
    }
  };
  static transferAmount = async ({ senderId, receiverId, amount }) => {
    console.log(amount);
    // Decrease the sender's balance
    const sender = await _HDpay.findOneAndUpdate(
      { _id: senderId, amount: { $gte: amount } },
      { $inc: { amount: -amount } },
      { new: true }
    );
    if (!sender)
      return {
        code: 500,
        message: "Sender does not have sufficient funds",
      };

    await _HDpay.updateOne(
      { _id: receiverId },
      { $inc: { amount: amount } },
      { new: true }
    );

    // Increase the receiver's balance
    return {
      code: 200,
      message: "Success!",
    };
  };

  static minusAmountToAddcount = async ({ hdPayId, userId }) => {
    const userExist = await _HDpay.findById({ _id: userId });
    if (!userExist)
      return {
        code: 400,
        message: "User not found!",
      };
    const isSuccess = await _HDpay.findOneAndUpdate(
      {
        _id: hdPayId,
        userId,
        amount: { $gte: amount },
      },
      {
        $inc: {
          amount: -amount,
        },
      },
      {
        new: true,
      }
    );

    if (!isSuccess)
      return {
        code: 400,
        message: "Insufficient account balance!",
      };
    else {
      return {
        code: 200,
        message: "Success!",
      };
    }
  };

  static addCoin = async ({ hdPayId, userId, coin }) => {
    const userExist = await _HDpay.findById({ _id: userId });
    if (!userExist)
      return {
        code: 400,
        message: "User not found!",
      };
    const isSuccess = await _HDpay.findOneAndUpdate(
      {
        _id: hdPayId,
        userId,
      },
      {
        $inc: {
          coin: coin,
        },
      },
      {
        new: true,
      }
    );
    if (!isSuccess)
      return {
        code: 400,
        message: "Error",
      };
    else {
      return {
        code: 200,
        message: "Success!",
      };
    }
  };

  static minusAccount = async ({ hdPayId, userId, coin }) => {
    const userExist = await _HDpay.findById({ _id: userId });
    if (!userExist)
      return {
        code: 400,
        message: "User not found!",
      };
    const isSuccess = await _HDpay.findOneAndUpdate(
      {
        _id: hdPayId,
        userId,
        coin: { $gte: coin },
      },
      {
        $inc: {
          coin: -coin,
        },
      },
      {
        new: true,
      }
    );
    if (!isSuccess)
      return {
        code: 400,
        message: "Error",
      };
    else {
      return {
        code: 200,
        message: "Success!",
      };
    }
  };
}

export default hdPayService;
