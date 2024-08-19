import { Request, Response, NextFunction } from 'express';

export const canAccessUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;
    if (
      auth.role === 'admin' ||
      auth.role === 'tutor' ||
      auth.id.toString() === req.params.id.toString()
    ) {
      next();
    } else {
      res.status(403);
      throw new Error('Keine Berechtigung auf Datenzugriff');
    }
  } catch (error) {
    next(error);
  }
};
