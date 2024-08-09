import { Request, Response, NextFunction } from 'express';
import { db } from '../../../config/db';

/**
 * getCommentStatusByUserIssues
 *
 * @description         Gets all issues related to the user and checks if the user has seen the related comments
 * @route               GET /api/v1/analytics/comments/seen
 * @access              Private
 */

export const getCommentStatusByUserIssues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;
    let issues;

    if (auth.role !== 'admin') {
      issues = await db('issue')
        .where('created_from', auth.id)
        .orWhere('assigned_to', auth.id);
    } else {
      issues = await db('issue');
    }

    const issueIds = issues?.map(({ id }) => id);

    const result = await db('comment as c')
      .leftJoin('comment_seen_by_user as csbu', function () {
        this.on('c.id', 'csbu.comment_id').andOn(
          'csbu.user_id',
          req.body.auth.id
        );
      })
      .whereNull('csbu.comment_id')
      .whereIn('c.issue_id', issueIds)
      .count('c.id as unseen_comments_count')
      .first();

    res.status(200).json({
      comments: {
        new: {
          count: result?.unseen_comments_count ?? 0,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
