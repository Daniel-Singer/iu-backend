import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';
import { hashPassword } from '../../utils/hashPassword';

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
    const { password, auth, confirmPassword, ...rest } = req.body;
    const hashedPassword = await hashPassword(password as string);
    const [userId] = await db('users').insert({
      ...rest,
      password: hashedPassword,
    });
    const user = await db
      .select('id', 'first_name', 'last_name', 'password')
      .from('users')
      .where({ id: userId })
      .first();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
