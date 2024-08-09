import { Request, Response, NextFunction } from 'express';

export const updateDataProvided = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth, ...update } = req.body;
    if (Object.keys(update).length > 0) {
      next();
    } else {
      res.status(409);
      throw new Error('Bitte Daten für Update zur Verfügung stellen');
    }
  } catch (error) {
    next(error);
  }
};
