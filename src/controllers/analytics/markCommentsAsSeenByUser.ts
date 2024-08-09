import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * markCommentsAsSeenByUser
 *
 * @description     Creates new entries in table comment_seen_by_user
 * @route           POST /api/v1/analytics/comments/seen
 * @access          Private
 */

export const markCommentsAsSeenByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;
    const { issue_id } = req.params;
    // find all comments related to
    const comments = await db('comment')
      .select(['id'])
      .where('issue_id', issue_id);

    // prepare data to be inserted into db
    const insertData = comments?.map(({ id }) => ({
      comment_id: id,
      user_id: auth.id,
    }));

    const [inserted] = await db('comment_seen_by_user').insert(insertData);
    res.status(200).json(inserted);
  } catch (error) {
    next(error);
  }
};
