import { Request, Response, NextFunction } from 'express';

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
  } catch (error) {
    next(error);
  }
};
