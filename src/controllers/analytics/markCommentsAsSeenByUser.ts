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
    // find all comments related to issue
    const comments = await db('comment')
      .select(['id'])
      .where('issue_id', issue_id);

    // prepare data to be inserted into db
    const insertData = comments?.map(({ id }) => ({
      comment_id: id,
      user_id: auth.id,
    }));

    await db('comment_seen_by_user').insert(insertData);

    res.sendStatus(200);
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409);
      error.message = 'Kommentare bereits als gesehen markiert';
    }
    next(error);
  }
};
