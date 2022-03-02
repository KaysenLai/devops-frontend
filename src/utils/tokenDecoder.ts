import jwt from 'jsonwebtoken';
import ITokenPayload from 'types/ITokenPayload';

/**
 * Decode Json Web Token
 * @param token JWT to be decoded
 * @returns decoded payload
 */
const tokenDecoder = (token: string | null): ITokenPayload => {
  const decoded = jwt.decode(token as string);
  if (!decoded) {
    return {
      id: null,
      role: null,
      firstName: null,
      email: null,
    };
  }
  return decoded as ITokenPayload;
};

export default tokenDecoder;
