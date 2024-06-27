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
    const { role } = req.query;
    if (!role || role === '') {
      const users: IUserBase[] = await db
        .select([
          'id',
          'first_name',
          'last_name',
          'matrikel_nr',
          'role',
          'email',
        ])
        .from('users');
      res.status(200).json(users);
    } else {
      const users: IUserBase[] = await db('users')
        .select([
          'id',
          'first_name',
          'last_name',
          'matrikel_nr',
          'role',
          'email',
        ])
        .where('role', role);
      res.status(200).json(users);
    }
  } catch (error) {
    next(error);
  }
};
