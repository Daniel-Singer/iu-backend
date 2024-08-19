import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listNotifications
 *
 * @description     Lists all notifications for given user
 * @route           GET /api/v1/notifications
 * @access          Private
 */

export const listNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;
    const notifications = await db('notification')
      .where({
        recipient_id: auth.id,
      })
      .orderBy('created_at', 'desc');
    res.status(200).json(notifications);
  } catch (error) {
    next(error);
  }
};
