import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

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
    const { currentPassword, newPassword, confirmNewPassword, ...update } =
      body;

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
