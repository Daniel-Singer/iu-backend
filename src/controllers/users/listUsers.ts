import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listUsers
 *
 * @description     Returns all users currently stored in database
 * @route           GET /api/v1/users
 * @access          Admin
 */

export const listUsers = async (
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
