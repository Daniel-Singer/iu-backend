import { Request, Response, NextFunction } from 'express';

/**
 * hasRequiredData
 *
 * @description     Makes sure all required data is available in req body
 */

export const hasRequiredData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, title } = req.body;
    if (!code || !title) {
      res.status(409);
      throw new Error('Bitte alle benötigten Daten zur Verfügung stellen');
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
