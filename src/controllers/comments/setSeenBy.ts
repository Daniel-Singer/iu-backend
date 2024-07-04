import { Request, Response, NextFunction } from 'express';

/**
 * setSeenBy
 *
 * @description     Sets a timestamp for seen_by_<role> for handling notifications
 * @route           POST /api/v1/comments/seen/:id
 * @access          Private, Admin
 */

export const setSeenBy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      ...req.body,
    });
  } catch (error) {
    next(error);
  }
};
