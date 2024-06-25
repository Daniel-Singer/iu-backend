import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * getMyAccount
 *
 * @description     Returns single user
 * @route           GET /api/v1/myaccount
 * @access          Private User
 */

export const getMyAccount = async (
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
      ])
      .from('users')
      .where('id', req.body.auth.id)
      .first();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
