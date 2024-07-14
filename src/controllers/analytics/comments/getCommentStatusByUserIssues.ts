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

    // find all issues related to user if user is creator or assignee
    const issues: IIssueReceive[] = await db('issue')
      .where('created_from', auth.id)
      .orWhere('assigned_to', auth.id);

    // get all issue ids
    const issueIds = issues.map(({ id }) => id!);

    // find all related comments for all issues
    const comments = await db('comment').whereIn('issue_id', issueIds);

    // get all comment ids
    const commentIds = comments.map(({ id }) => id!);

    // check if the user has seen the comments yet
    const seenByUser = await db('comment_seen_by_user')
      .select(['comment_id'])
      .whereIn('comment_id', commentIds);

    // get commentIds array of seenByUser
    const seenByUserCommentIds = seenByUser.map(
      ({ comment_id }) => comment_id!
    );

    const allCommentIds = [...commentIds, ...seenByUserCommentIds];

    // get ids of comments that user has not seen yet

    const hasNotSeenComments = allCommentIds.filter(
      (id) => !(commentIds.includes(id) && seenByUserCommentIds.includes(id))
    );

    res.status(200).json({
      comments: {
        new: {
          count: hasNotSeenComments.length!,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
