import { Request, Response, NextFunction } from 'express';

/**
 * isAdmin
 *
 * @description     Middleware to protect routes that are only available for Admins
 *
 */

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.auth.role === 'admin') {
      next();
    } else {
      res.status(403);
      throw new Error('Zugriff nicht gestattet.');
    }
  } catch (error) {
    next(error);
  }
};
