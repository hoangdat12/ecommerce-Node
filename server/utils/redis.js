import client from "../helper/connectRedis.js";

const get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) reject(err);
      else resolve(JSON.parse(reply));
    });
  });
};

const set = async (key, value, timeExpire) => {
  if (!key || !value || !timeExpire) {
    console.log("Missing value with setnx");
    return;
  }
  // Su co tuyet lo redis
  const expiresIn =
    timeExpire + Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  console.log("expiresIn", expiresIn);
  await client.set(key, JSON.stringify(value), "EX", expiresIn);
};

export { get, set };
