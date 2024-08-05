import { Request, Response, NextFunction } from 'express';

/**
 * isAdminOrTutor
 *
 * @description     Middleware to protect routes that are only available for Admins or Tutors
 *
 */

export const isAdminOrTutor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.auth.role === 'admin' || req.body.auth.role === 'tutor') {
      next();
    } else {
      res.status(403);
      throw new Error('Zugriff nicht gestattet.');
    }
  } catch (error) {
    next(error);
  }
};
