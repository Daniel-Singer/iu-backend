import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../../config/db';
import { comparePasswords } from '../../utils/comparePasswords';

/**
 * login
 *
 * @description     Handles Login and user authentication
 * @route           POST /api/v1/auth/login
 * @access          Public
 */

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error('Benutzername und Passwort erforderlich');
    }
    const user: IUserReceive | null = await db
      .select()
      .from('users')
      .where('username', username)
      .orWhere('email', username)
      .first();

    if (user) {
      if (!user.active) {
        res.status(403);
        throw new Error(
          'Sie haben keine Zugriffsberechtigung für diese Plattform'
        );
      } else {
        const accepted = await comparePasswords(password, user?.password!);
        if (accepted) {
          // generate access token
          const accessToken = jwt.sign(
            {
              user: {
                id: user.id,
                username: user.username,
                role: user.role!,
              },
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
          );

          // generate refresh token
          const refreshToken = jwt.sign(
            {
              user: {
                id: user.id,
                username: user.username,
                role: user.role!,
              },
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
          );

          // store refresh token in user row
          await db('users').where({ id: user.id }).update({
            refresh_token: refreshToken,
          });

          // set cookie for refresh token
          res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
          });

          const { password, refresh_token, ...rest } = user;
          res.status(200).json({ ...rest, accessToken });
        } else {
          res.status(401);
          throw new Error('Falsches Passwort');
        }
      }
    } else {
      res.status(404);
      throw new Error('Es existiert kein Benutzer mit diesem Benutzernamen');
    }
  } catch (error) {
    next(error);
  }
};
