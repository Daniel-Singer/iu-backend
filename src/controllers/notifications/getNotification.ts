import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * getNotification
 *
 * @description     Returns notification from db by provided id
 * @route           GET /api/v1/notifications/:id
 * @access          Private
 */

export const getNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db('notification').update({ seen: 1 }).where({ id: req.params.id });
    const notification = await db('notification')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(notification);
  } catch (error) {
    next(error);
  }
};
