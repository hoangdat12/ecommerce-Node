import {
  discountsPercent,
  discountsAmount,
  discountsCoin,
} from "./listDiscount.js";
import { getYearMonthDateHours } from "./listDiscount.js";

const date_01_01 = (timeEffect) => {
  console.log("timeEffect", timeEffect);
  const code = "D0101";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM11`,
      quantity: 100,
      discount: 11,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am11",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM110`,
      quantity: 100,
      discount: 110,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am110",
      type: "fixed amount",
      description: "Tren 200k",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_02_02 = (timeEffect) => {
  const code = "D0202";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM22`,
      quantity: 100,
      discount: 22,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am22",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM220`,
      quantity: 100,
      discount: 220,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am220",
      type: "fixed amount",
      description: "Tren 500k",
    },
    {
      code: `${code}AM222`,
      quantity: 10,
      discount: 222,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am222",
      type: "fixed amount",
      description: "Tren 1tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_03_03 = (timeEffect) => {
  const code = "D0303";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM33`,
      quantity: 100,
      discount: 33,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am33",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM333`,
      quantity: 100,
      discount: 333,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am333",
      type: "fixed amount",
      description: "Tren 500k",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_04_04 = (timeEffect) => {
  const code = "D0404";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM44`,
      quantity: 100,
      discount: 44,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am44",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM444`,
      quantity: 10,
      discount: 444,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am444",
      type: "fixed amount",
      description: "Tren 500k",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_05_05 = (timeEffect) => {
  const code = "D0505";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM55`,
      quantity: 100,
      discount: 55,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am55",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM555`,
      quantity: 10,
      discount: 555,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am555",
      type: "fixed amount",
      description: "Tren 1tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_06_06 = (timeEffect) => {
  const code = "D0606";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM66`,
      quantity: 100,
      discount: 66,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am66",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM666`,
      quantity: 10,
      discount: 666,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am666",
      type: "fixed amount",
      description: "Tren 1tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_07_07 = (timeEffect) => {
  const code = "D0707";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM77`,
      quantity: 100,
      discount: 77,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am77",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM777`,
      quantity: 10,
      discount: 777,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am777",
      type: "fixed amount",
      description: "Tren 1tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_08_08 = (timeEffect) => {
  const code = "D0808";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM88`,
      quantity: 100,
      discount: 88,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am88",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM888`,
      quantity: 10,
      discount: 888,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am888",
      type: "fixed amount",
      description: "Tren 1tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_09_09 = (timeEffect) => {
  const code = "D0909";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM99`,
      quantity: 100,
      discount: 99,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am99",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM999`,
      quantity: 10,
      discount: 999,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am999",
      type: "fixed amount",
      description: "Tren 1tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_10_10 = (timeEffect) => {
  const code = "D1010";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM100`,
      quantity: 100,
      discount: 100,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am100",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM1010`,
      quantity: 10,
      discount: 1010,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am1010",
      type: "fixed amount",
      description: "Tren 1.5tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_11_11 = (timeEffect) => {
  const code = "D1111";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM111`,
      quantity: 100,
      discount: 111,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am111",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM1111`,
      quantity: 10,
      discount: 1111,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am1111",
      type: "fixed amount",
      description: "Tren 1.5tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const date_12_12 = (timeEffect) => {
  const code = "D1212";
  const { year, month, date, hours } = timeEffect;
  const percent = discountsPercent(code, timeEffect);
  const amount = discountsAmount(code, timeEffect);
  const coin = discountsCoin(code, timeEffect);

  const moreAmount = [
    {
      code: `${code}AM120`,
      quantity: 100,
      discount: 120,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am120",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM1212`,
      quantity: 10,
      discount: 1212,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am1212",
      type: "fixed amount",
      description: "Tren 1.5tr",
    },
  ];

  return [...percent, ...amount, ...coin, ...moreAmount];
};

const listDiscount = {
  date_01_01: date_01_01,
  date_02_02: date_02_02,
  date_03_03: date_03_03,
  date_04_04: date_04_04,
  date_05_05: date_05_05,
  date_06_06: date_06_06,
  date_07_07: date_07_07,
  date_08_08: date_08_08,
  date_09_09: date_09_09,
  date_10_10: date_10_10,
  date_11_11: date_11_11,
  date_12_12: date_12_12,
};

const getListDiscount = (timeEffect, datePromotion) => {
  return listDiscount[datePromotion](timeEffect);
};

export default getListDiscount;
