import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * getUser
 *
 * @description     Returns single user
 * @route           GET /api/v1/users/:id
 * @access          Admin
 */

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: IUserStudent = await db
      .select([
        'id',
        'first_name',
        'last_name',
        'username',
        'matrikel_nr',
        'email',
        'role',
        'active',
      ])
      .from('users')
      .where('id', req.params.id)
      .first();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
