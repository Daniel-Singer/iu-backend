import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * createIssueStatus
 *
 * @description     Creates a new status for given issue
 * @route           POST /api/v1/status/issue/:id
 * @access          Private
 */

export const createIssueStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [issue_status_id] = await db('issue_status').insert({
      issue_id: req.params.id,
      status_id: req.body.status_id,
      created_from: req.body.auth.id,
    });
    const issue_status: IIssueStatusReceive = await db('issue_status')
      .where({
        id: issue_status_id,
      })
      .first();
    res.status(201).json(issue_status);
  } catch (error) {
    next(error);
  }
};
