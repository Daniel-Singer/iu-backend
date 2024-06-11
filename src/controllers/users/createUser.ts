import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * createUser
 *
 * @description     Creates new user row in users table
 * @route           POST /api/v1/users
 * @access          Admin
 */

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users: IUserBase = await db
      .select('first_name', 'last_name')
      .from('users');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
