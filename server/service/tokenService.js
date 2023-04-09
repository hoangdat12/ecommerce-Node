import jwt from 'jsonwebtoken';

class tokenService {
  static generateActivationToken = async (email) => {
    return new Promise((resolve, reject) => {
      const payload = { email };
      const secret = process.env.SECRET_VERIFY_EMAIL_KEY;
      const options = { expiresIn: '30m' };

      jwt.sign(payload, secret, options, (err, activationToken) => {
        if (err) reject(err);
        resolve(activationToken);
      });
    });
  };

  static verifyActivationToken = async (activationToken) => {
    console.log('verifyActivationToken:::::activationToken->', activationToken);
    return new Promise((resolve, reject) => {
      jwt.verify(
        activationToken,
        process.env.SECRET_VERIFY_EMAIL_KEY,
        (err, decode) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log('VerifyActivationToken::::::decode-> ', decode);
          resolve(decode.email);
        }
      );
    });
  };

  static signAccessToken = async ({ userId, email, isAdmin }) => {
    return new Promise((resolve, reject) => {
      const payload = { userId, email, isAdmin };
      const secret = process.env.SECRET_ACCESS_KEY;
      const options = { expiresIn: '1h' };

      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(token);
      });
    });
  };

  static verifyAccessToken = async (req, res, next) => {
    try {
      const headers = req.headers['authorization'];
      console.log('headers', headers);
      if (!headers) return res.status(401).json({ message: 'Unvalid' });

      const token = headers.split(' ')[1];

      jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, decode) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ message: 'UnAuthentication' });
        }
        req.user = decode;
        next();
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  };

  static signRefreshToken = async ({ userId, email, isAdmin }) => {
    return new Promise((resolve, reject) => {
      const payload = { userId, email, isAdmin };
      const secret = process.env.SECRET_REFRESH_KEY;
      const options = { expiresIn: '7d' };

      jwt.sign(payload, secret, options, (err, refresh) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(refresh);
      });
    });
  };

  static verifyRefreshToken = async (req, res) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(401);

      const refreshToken = cookies.jwt;

      jwt.verify(
        refreshToken,
        process.env.SECRET_REFRESH_KEY,
        (err, decode) => {
          if (err) {
            console.log(err);
            return false;
          }
          return decode;
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error!' });
    }
  };
}

export default tokenService;
