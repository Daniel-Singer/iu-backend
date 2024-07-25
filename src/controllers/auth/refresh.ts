import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../../config/db';

/**
 * refresh
 *
 * @description     Handles refreshing token
 * @route           GET /api/v1/auth/refresh
 * @access          Public
 */

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // handle no cookies found
    if (!req.cookies?.refresh_token) {
      res.status(401);
      throw new Error('Refresh fehlgeschlagen');
    } else {
      const user: IUserReceive | undefined = await db('users')
        .where('refresh_token', req.cookies?.refresh_token)
        .first();

      // handle no user found
      if (!user) {
        res.status(403);
        throw new Error('Zugriff nicht erlaubt');
      } else {
        const decoded: any = await jwt.verify(
          req.cookies?.refresh_token,
          process.env.JWT_SECRET as string
        );
        // handle invalid token
        if (!decoded || decoded.user.username !== user.username) {
          res.status(403);
          throw new Error('Kein gültiger Token');
        } else {
          const accessToken = await jwt.sign(
            {
              user: {
                id: user.id,
                username: user.username,
                role: user.role!,
              },
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '30s' }
          );
          res.status(200).json({ accessToken });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
