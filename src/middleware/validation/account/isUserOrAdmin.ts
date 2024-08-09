import { Request, Response, NextFunction } from 'express';

/**
 * isUserOrAdmin
 *
 * @description     Middleware to protect routes that are only available for the user or administrators
 *
 */

export const isUserOrAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;
    if (auth.id == req.params.id || auth.role === 'admin') {
      next();
    } else {
      res.status(403);
      throw new Error('Keine Berechtigung die Userdaten zu ändern');
    }
  } catch (error) {
    next(error);
  }
};
