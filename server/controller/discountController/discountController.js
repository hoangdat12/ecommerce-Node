import DiscountOptions from "./discount.js";
import getListDiscount from "../../service/discountService/discount.js";

const date_01_01 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_01_01");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_03_03 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_03_03");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_04_04 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_04_04");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_05_05 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_05_05");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_06_06 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_06_06");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_07_07 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_07_07");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_08_08 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_08_08");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_09_09 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_08_08");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_10_10 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_08_08");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_11_11 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_08_08");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

const date_12_12 = (timeEffect) => {
  const discounts = getListDiscount(timeEffect, "date_08_08");
  discounts.map((discount) => {
    DiscountOptions.generateDiscount(discount);
  });
};

// Genarate Discount code and save in Redis
const timeEffect = {
  year: 2023,
  month: 2,
  date: 12,
  hours: 22,
};
date_01_01(timeEffect);
