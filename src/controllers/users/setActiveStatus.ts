import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * setActiveStatus
 *
 * @description     Changes active status of user.
 * @route           PUT /api/v1/users/active/:id
 * @access          Admin
 */

export const setActiveStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await db('users').where({ id: req.params.id }).first();
    if (user) {
      await db('users')
        .where({ id: req.params.id })
        .update({ active: user.active === 1 ? 0 : 1 });
      res.status(200).json({ active: user.active === 1 ? 0 : 1 });
    } else {
      res.status(404);
      throw new Error(`Der von Ihnen gesuchte User existiert nicht`);
    }
  } catch (error) {
    next(error);
  }
};
