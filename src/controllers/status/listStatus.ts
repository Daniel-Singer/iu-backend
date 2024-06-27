import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listStatus
 *
 * @description     Returns all status stored in database
 * @route           GET /api/v1/status
 * @access          Private
 */

export const listStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = await db.select().table('status');
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};
