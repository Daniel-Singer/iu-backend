import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listComments
 *
 * @description     Returns all comments currently stored in database
 * @route           GET /api/v1/comments
 * @access          Private
 */

export const listComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { issue_id } = req.params;
    const comments = await db
      .select('*')
      .from('comment')
      .where('issue_id', issue_id);

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
