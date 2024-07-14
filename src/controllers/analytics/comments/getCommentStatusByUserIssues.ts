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
    // find all issues related to user
    const issues: IIssueReceive[] = await db('issue')
      .where('created_from', auth.id)
      .orWhere('assigned_to', auth.id);
    res.status(200).json(issues);
  } catch (error) {
    next(error);
  }
};
