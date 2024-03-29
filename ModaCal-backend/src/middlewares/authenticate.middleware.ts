import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      vendorId?: number;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({error: 'No token provided'});
  }

  jwt.verify(token, process.env.SECRET_KEY!, (err, decoded) => {
    if (err) {
      return res.status(401).json({error: 'Failed to authenticate token'});
    }
    const decodedToken = decoded as DecodedToken;
    req.vendorId = decodedToken.userId;
    next();
  });
};
