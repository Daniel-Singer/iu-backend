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
      .select(['id', 'first_name', 'last_name', 'matrikel_nr', 'role'])
      .from('users');
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
