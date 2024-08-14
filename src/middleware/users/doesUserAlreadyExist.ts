import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * doesUserAlreadyExist
 *
 * @description     Makes sure the user does not exist yet. Throws error if it does
 */

export const doesUserAlreadyExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name } = req.body;
    const user = await db('users')
      .whereRaw('LOWER(first_name) = ?', first_name.toLowerCase())
      .andWhereRaw('LOWER(last_name) = ?', last_name.toLowerCase())
      .first();

    if (!user) {
      next();
    } else {
      res.status(409);
      throw new Error(
        `Ein Benutzer mit dem Namen ${user.first_name} ${user.last_name}`
      );
    }
  } catch (error) {
    next(error);
  }
};
