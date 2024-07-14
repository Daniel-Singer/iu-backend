import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * setSeenByUser
 *
 * @description     Creates a column in comment seen by user. It requires the issue_id
 *
 * @route           POST /api/v1/comments/seen/:issue_id
 * @access          Private, Admin
 */

export const setSeenByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;

    // find all related comments to issue
    const comments = await db('comment').where({
      issue_id: req.params.issue_id,
    });

    const commentIds = comments.map(({ id }) => id);

    const commentSeenByUser = await db('comment_seen_by_user').whereIn(
      'comment_id',
      commentIds
    );

    res.status(200).json(commentSeenByUser);
  } catch (error) {
    next(error);
  }
};
