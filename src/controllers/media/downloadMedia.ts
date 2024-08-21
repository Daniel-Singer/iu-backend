import { Request, Response, NextFunction } from 'express';

/**
 * downloadMedia
 *
 * @description     Downloads media with requested id
 * @route           GET /api/v1/media/:id
 * @access          Private
 */

export const downloadMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(req.body);
  } catch (error) {
    next(error);
  }
};
