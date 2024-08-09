import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';
import { comparePasswords } from '../../utils/comparePasswords';
import { hashPassword } from '../../utils/hashPassword';

/**
 * updateUser
 *
 * @description     Updates user entry in database.
 * @route           PUT /api/v1/users/:id
 * @access          User, Admin
 */

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth, ...body } = req.body;
    const {
      password,
      currentPassword,
      newPassword,
      confirmNewPassword,
      ...update
    } = body;

    // find user
    const user: IUserReceive = await db('users')
      .where({ id: req.params.id })
      .first();

    if (user) {
      if (!currentPassword) {
        // update user if there is no need to update password
        await db('users').where({ id: req.params.id }).update(update);
        res.sendStatus(200);
      } else {
        // make sure the proviced current password is correct
        const isCorrectPassword = await comparePasswords(
          currentPassword,
          user.password
        );
        if (isCorrectPassword) {
          // check if new password and new password confirmation matches
          const passwordsMatch = newPassword === confirmNewPassword;

          if (passwordsMatch) {
            const hashedPassword = await hashPassword(newPassword);
            await db('users')
              .where({ id: req.params.id })
              .update({ password: hashedPassword });
            res.sendStatus(200);
          } else {
            res.status(409);
            throw new Error(
              'Update Fehlgeschlagen! Neue Passwörter stimmen nicht überein'
            );
          }
        } else {
          res.status(400);
          throw new Error('Update Fehlgeschlagen! Falsches Passwort');
        }
      }
    } else {
      res.status(404);
      throw new Error(
        'Update Fehlgeschlagen! Der gesuchte User existiert nicht.'
      );
    }
  } catch (error) {
    next(error);
  }
};
