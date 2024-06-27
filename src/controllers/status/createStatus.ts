import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * createStatus
 *
 * @description     Returns all status stored in database
 * @route           Post /api/v1/status
 * @access          Private, Admin
 */

export const createStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { label, description } = req.body;

    const exists = await db('status').where('label', label);

    if (!!exists) {
      const [statusId] = await db('status').insert({
        label,
        description,
      });

      const status = await db('status').where('id', statusId).first();
      res.status(200).json(status);
    } else {
      res.status(409);
      throw new Error('Status existiert bereits');
    }
  } catch (error) {
    next(error);
  }
};
