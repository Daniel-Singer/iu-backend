import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';
import { hashPassword } from '../../utils/hashPassword';

/**
 * resetPassword
 *
 * @description     Resets password of user in db
 * @route           PUT /api/v1/users/resetpassword/:id
 * @access          Admin
 */

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const user = await db('users').where({ id: req.params.id }).first();
    if (user) {
      if (newPassword === confirmPassword) {
        const newHashedPassword = await hashPassword(newPassword);
        await db('users')
          .where({ id: req.params.id })
          .update({ password: newHashedPassword });
        res.sendStatus(200);
      } else {
        res.status(409);
        throw new Error('Die beiden Passwörter stimmen nicht überein');
      }
    } else {
      res.status(404);
      throw new Error(
        'Passwort reset fehlgeschlagen! Der von Ihnen gesuchte User existiert nicht'
      );
    }
  } catch (error) {
    next(error);
  }
};
