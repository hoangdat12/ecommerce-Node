import { get, set } from "../../utils/redis.js";

import getPromotionPrice from "../../service/discountService/discountService.js";
// import getListDiscount from "../service/discountService/discount.js";

// FACTORY METHOD PATTERN

// CORE
class Discount {
  constructor({
    code,
    quantity,
    discount,
    type,
    description,
    key,
    effectedFrom,
  }) {
    const { year, month, date, hours } = effectedFrom;
    this.code = code;
    this.quantity = quantity;
    this.discount = discount;
    this.type = type;
    this.key = key;
    this.description = description;
    this.createdAt = new Date().toISOString();
    this.effectedFrom = this.getTimeDate({ year, month, date, hours });
    this.expiresIn = this.getTimeDate({ year, month, date, hours: hours + 1 });
  }
  // GETER AND SETTER
  getEffectedFrom = () => {
    return this.effectedFrom;
  };

  getCreatedAt = () => {
    return this.createdAt;
  };

  // PUBLIC
  isValid = () => {
    const now = new Date();
    const time = this.calculatorTime(now.toISOString(), this.effectedFrom);
    if (time >= 0 && time <= 3600) {
      return true;
    } else {
      return false;
    }
  };

  isExpire = () => {
    const now = new Date();
    const time = this.calculatorTime(this.expiresIn, now.toISOString());
    if (time > 3600) {
      return true;
    } else {
      return false;
    }
  };

  getDiscount = () => {
    return {
      code: this.code,
      quantity: this.quantity,
      type: this.type,
      discount: this.discount,
      key: this.key,
      description: this.description,
      createdAt: this.createdAt,
      effectedFrom: this.effectedFrom,
      expiresIn: this.expiresIn,
    };
  };

  toString = () => {
    console.log(`this.code: ${this.code},
      this.quantity: ${this.quantity},
      this.discount: ${this.discount},
      this.type: ${this.type},
      this.key: ${this.key},
      this.description: ${this.description},
      this.createdAt: ${this.createdAt},
      this.effectedFrom: ${this.effectedFrom},
      this.expiresIn: ${this.expiresIn}`);
  };

  // PRIVATE
  discountExpiresIn = () => {
    const now = new Date();
    return this.calculatorTime(this.expiresIn, now.toISOString()) / 60;
  };

  calculatorTime = (time1, time2) => {
    time1 = new Date(time1);
    time2 = new Date(time2);
    const time = time1 - time2;
    return time / 1000; // second
  };

  getTimeDate = ({ year, month, date, hours }) => {
    const timeDate = new Date(
      year,
      month - 1,
      date,
      hours,
      0,
      0,
      0
    ).toISOString();
    return timeDate;
  };
}

// TYPE DISCOUNT
class PercentageDiscount extends Discount {
  constructor({ code, quantity, discount, description, key, effectedFrom }) {
    super({
      code,
      quantity,
      discount,
      type: "percentage",
      key,
      description,
      effectedFrom,
    });
  }
}

class FixedAmountDiscount extends Discount {
  constructor({ code, quantity, discount, description, key, effectedFrom }) {
    super({
      code,
      quantity,
      discount,
      type: "fixed amount",
      key,
      description,
      effectedFrom,
    });
  }
}

class CoinDiscount extends Discount {
  constructor({ code, quantity, discount, description, key, effectedFrom }) {
    super({
      code,
      quantity,
      discount,
      type: "coin",
      key,
      description,
      effectedFrom,
    });
  }
}

// FACTORY
class DiscountFactory {
  static createDiscount(type, options) {
    switch (type) {
      case "percentage":
        return new PercentageDiscount(options);
      case "fixed amount":
        return new FixedAmountDiscount(options);
      case "coin":
        return new CoinDiscount(options);
      default:
        console.log(`Invalid discount type: ${type}`);
    }
  }
}

class DiscountOptions {
  static generateDiscount = ({
    code,
    quantity,
    discount,
    type,
    key,
    description,
    effectedFrom,
  }) => {
    const _discount = DiscountFactory.createDiscount(type, {
      code,
      quantity,
      discount,
      key,
      effectedFrom,
      description,
    });
    // TIME EXPIRE IN REDIS
    const timeExpire = parseInt(_discount.discountExpiresIn());
    if (timeExpire <= 0) {
      return;
    }
    // SET DISCOUNT IN REDIS
    set(
      code,
      { code, quantity, discount, type, key, description, effectedFrom },
      timeExpire
    );
  };

  static applyDiscount = async (code, price) => {
    const _discount = await get(code);
    if (!_discount) {
      console.log("Discount is not Exist!");
      return false;
    }
    const discountFactory = DiscountFactory.createDiscount(
      _discount.type,
      _discount
    );
    if (discountFactory.isExpire()) {
      console.log("Discount is Expire!");
      return price;
    }
    // Check discount is valid
    else if (discountFactory.isValid()) {
      return getPromotionPrice(price, discountFactory.key);
    } else {
      console.log("Discount no Effect!");
      return price;
    }
  };
}

export default DiscountOptions;
