import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../../config/db';
/**
 * protected
 *
 * @description     Middleware to protect unallowed access to api endpoints
 */

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get the Bearer Tokens value
    const accessToken = req.headers['authorization']?.split(' ')[1];

    if (!accessToken) {
      res.status(401);
      throw new Error(
        'Keine Zugriffsberechtigung. Authentifizierung fehlgeschlagen'
      );
    } else {
      // get user data from token
      const decoded: any = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      );
      const user: IUserBase = await db('users')
        .select('id', 'first_name', 'last_name', 'username', 'role')
        .where('id', decoded?.user?.id)
        .first();

      if (user) {
        req.body.auth = user;
        next();
      } else {
        res.status(403);
        throw new Error('Keine Zugriffsberechtigung. Unbekannter User');
      }
    }
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      error.message = 'Keine Zugriffsberechtigung. Token abgelaufen';
    }
    next(error);
  }
};
