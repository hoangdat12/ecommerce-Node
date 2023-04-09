export const getYearMonthDateHours = (year, month, date, hours) => {
  if (!year || !month || !date || !hours) {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      date: now.getDate(),
      hours: now.getTime() + 1,
    };
  }
  return {
    year,
    month,
    date,
    hours,
  };
};
// DISCOUNT
const discountsPercent = (code, timeEffect) => {
  const { year, month, date, hours } = timeEffect;
  return [
    {
      code: `${code}PCT15 `,
      quantity: 100,
      discount: 0.15,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "p15",
      type: "percentage",
      description: "Toan san",
    },
    {
      code: `${code}PCT20 `,
      quantity: 100,
      discount: 0.2,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "p20",
      type: "percentage",
      description: "Duoi 200k",
    },
    {
      code: `${code}PCT30 `,
      quantity: 100,
      discount: 0.3,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "p30",
      type: "percentage",
      description: "Duoi 100k",
    },
    {
      code: `${code}PCT40 `,
      quantity: 100,
      discount: 0.4,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "p40",
      type: "percentage",
      description: "Duoi 80k",
    },
    {
      code: `${code}PCT50 `,
      quantity: 100,
      discount: 0.5,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "p50",
      type: "percentage",
      description: "Duoi 50k",
    },
    {
      code: `${code}FREESHIP `,
      quantity: 100,
      discount: 0,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "FS0",
      type: "percentage",
      description: "Duoi 100k",
    },
  ];
};

const discountsAmount = (code, timeEffect) => {
  const { year, month, date, hours } = timeEffect;

  return [
    {
      code: `${code}AM10`,
      quantity: 100,
      discount: 10,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am10",
      type: "fixed amount",
      description: "Toan san",
    },
    {
      code: `${code}AM15`,
      quantity: 100,
      discount: 15,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am15",
      type: "fixed amount",
      description: "Tren 50k",
    },
    {
      code: `${code}AM20`,
      quantity: 100,
      discount: 20,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am20",
      type: "fixed amount",
      description: "Tren 80k",
    },
    {
      code: `${code}AM25`,
      quantity: 100,
      discount: 25,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am25",
      type: "fixed amount",
      description: "Tren 80k",
    },
    {
      code: `${code}AM30`,
      quantity: 100,
      discount: 30,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am30",
      type: "fixed amount",
      description: "Tren 100k",
    },
    {
      code: `${code}AM50`,
      quantity: 100,
      discount: 50,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am50",
      type: "fixed amount",
      description: "Tren 200k",
    },
    {
      code: `${code}AM80`,
      quantity: 100,
      discount: 80,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am80",
      type: "fixed amount",
      description: "Tren 250k",
    },
    {
      code: `${code}AM100`,
      quantity: 100,
      discount: 80,
      effectedFrom: getYearMonthDateHours(year, month, date, hours),
      key: "am100",
      type: "fixed amount",
      description: "Toan san",
    },
  ];
};

const discountsCoin = (code, timeEffect) => {
  const { year, month, date, hours } = timeEffect;
  return [];
};

export { discountsPercent, discountsAmount, discountsCoin };
