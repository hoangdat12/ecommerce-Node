// STRATERGY PATTERN

// DEFAULT
const discount_15_percent = (originalPrice) => {
  return originalPrice * 0.85;
};

const discount_20_percent = (originalPrice) => {
  // Tren 200
  if (originalPrice < 200) {
    return originalPrice;
  }
  return originalPrice * 0.8;
};

const discount_30_percent = (originalPrice) => {
  // Duoi 100k
  if (originalPrice > 100) {
    return originalPrice;
  }
  return originalPrice * 0.7;
};

const discount_40_percent = (originalPrice) => {
  // Duoi 80k
  if (originalPrice > 80) {
    return originalPrice;
  }
  return originalPrice * 0.6;
};

const discount_50_percent = (originalPrice) => {
  // Duoi 50k
  if (originalPrice > 50) {
    return originalPrice;
  }
  return originalPrice * 0.5;
};

const discount_10_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 10 > 0 ? originalPrice - 10 : 0;
};

const discount_15_amount = (originalPrice) => {
  // Tren 50k
  if (originalPrice < 50) {
    return originalPrice;
  }
  return originalPrice - 15;
};

const discount_20_amount = (originalPrice) => {
  // Tren 80k
  if (originalPrice < 80) {
    return originalPrice;
  }
  return originalPrice - 20;
};

const discount_25_amount = (originalPrice) => {
  // Tren 80k
  if (originalPrice < 80) {
    return originalPrice;
  }
  return originalPrice - 25;
};

const discount_30_amount = (originalPrice) => {
  // Tren 100k
  if (originalPrice < 100) {
    return originalPrice;
  }
  return originalPrice - 30;
};

const discount_50_amount = (originalPrice) => {
  // Tren 200k
  if (originalPrice < 200) {
    return originalPrice;
  }
  return originalPrice - 50;
};

const discount_80_amount = (originalPrice) => {
  // Tren 250k
  if (originalPrice < 250) {
    return originalPrice;
  }
  return originalPrice - 80;
};

const discount_100_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 100 > 0 ? originalPrice - 100 : 0;
};

// MORE
const discount_11_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 11 > 0 ? originalPrice - 11 : 0;
};

const discount_110_amount = (originalPrice) => {
  // Tren 200k
  if (originalPrice < 200) {
    return originalPrice;
  }
  return originalPrice - 110;
};

const discount_22_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 22 > 0 ? originalPrice - 22 : 0;
};

const discount_220_amount = (originalPrice) => {
  // Tren 500k
  if (originalPrice < 500) {
    return originalPrice;
  }
  return originalPrice - 220;
};

const discount_222_amount = (originalPrice) => {
  // Tren 500
  if (originalPrice < 500) {
    return originalPrice;
  }
  return originalPrice - 222;
};

const discount_33_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 33 > 0 ? originalPrice - 33 : 0;
};

const discount_333_amount = (originalPrice) => {
  // Tren 500
  if (originalPrice < 500) {
    return originalPrice;
  }
  return originalPrice - 333;
};

const discount_44_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 44 > 0 ? originalPrice - 44 : 0;
};

const discount_444_amount = (originalPrice) => {
  // Tren 500
  if (originalPrice < 500) {
    return originalPrice;
  }
  return originalPrice - 444;
};

const discount_55_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 55 > 0 ? originalPrice - 55 : 0;
};

const discount_555_amount = (originalPrice) => {
  // Tren 1tr
  if (originalPrice < 1000) {
    return originalPrice;
  }
  return originalPrice - 555;
};

const discount_66_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 66 > 0 ? originalPrice - 66 : 0;
};

const discount_666_amount = (originalPrice) => {
  // Tren 1tr
  if (originalPrice < 1000) {
    return originalPrice;
  }
  return originalPrice - 666;
};

const discount_77_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 77 > 0 ? originalPrice - 77 : 0;
};

const discount_777_amount = (originalPrice) => {
  // Tren 1tr
  if (originalPrice < 1000) {
    return originalPrice;
  }
  return originalPrice - 777;
};

const discount_88_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 88 > 0 ? originalPrice - 88 : 0;
};

const discount_888_amount = (originalPrice) => {
  // Tren 1tr
  if (originalPrice < 1000) {
    return originalPrice;
  }
  return originalPrice - 888;
};

const discount_99_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 99 > 0 ? originalPrice - 99 : 0;
};

const discount_999_amount = (originalPrice) => {
  // Tren 1tr
  if (originalPrice < 1000) {
    return originalPrice;
  }
  return originalPrice - 999;
};

const discount_100_amount_all = (originalPrice) => {
  // Toan san
  return originalPrice - 100 > 0 ? originalPrice - 100 : 0;
};

const discount_1010_amount = (originalPrice) => {
  // Tren 1tr
  if (originalPrice < 1500) {
    return originalPrice;
  }
  return originalPrice - 1010;
};

const discount_111_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 111 > 0 ? originalPrice - 111 : 0;
};

const discount_1111_amount = (originalPrice) => {
  // Tren 1tr
  if (originalPrice < 1500) {
    return originalPrice;
  }
  return originalPrice - 1111;
};

const discount_120_amount = (originalPrice) => {
  // Toan san
  return originalPrice - 120 > 0 ? originalPrice - 120 : 0;
};

const discount_1212_amount = (originalPrice) => {
  // Tren 1tr
  if (originalPrice < 1500) {
    return originalPrice;
  }
  return originalPrice - 1212;
};

const promotionPrice = {
  p15: discount_15_percent,
  p20: discount_20_percent,
  p30: discount_30_percent,
  p40: discount_40_percent,
  p50: discount_50_percent,
  am10: discount_10_amount,
  am15: discount_15_amount,
  am20: discount_20_amount,
  am25: discount_25_amount,
  am30: discount_30_amount,
  am50: discount_50_amount,
  am80: discount_80_amount,
  am100: discount_100_amount,
  am11: discount_11_amount,
  am110: discount_110_amount,
  am22: discount_22_amount,
  am220: discount_220_amount,
  am222: discount_222_amount,
  am33: discount_33_amount,
  am333: discount_333_amount,
  am44: discount_44_amount,
  am444: discount_444_amount,
  am55: discount_55_amount,
  am555: discount_555_amount,
  am66: discount_66_amount,
  am666: discount_666_amount,
  am77: discount_77_amount,
  am777: discount_777_amount,
  am88: discount_88_amount,
  am888: discount_888_amount,
  am99: discount_99_amount,
  am999: discount_999_amount,
  am100: discount_100_amount_all,
  am1010: discount_1010_amount,
  am111: discount_111_amount,
  am1111: discount_1111_amount,
  am120: discount_120_amount,
  am1212: discount_1212_amount,
};

const getPromotionPrice = (price, typePromotion) => {
  return promotionPrice[typePromotion](price);
};

export default getPromotionPrice;
