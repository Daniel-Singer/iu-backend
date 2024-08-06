import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * getIssuesStatus
 *
 * @description     Receive the status for given issue
 * @route           GET /api/v1/issues/status/:id
 * @access          Private
 */

export const getIssuesStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const issueStatus = await db('issue_status')
      .select([
        'issue_status.*',
        'status.id as status_id',
        'status.label as status_label',
        'users.id as user_id',
        'users.first_name as user_first_name',
        'users.last_name as user_last_name',
      ])
      .join('status', 'issue_status.status_id', 'status.id')
      .leftJoin('users', 'issue_status.created_from', 'users.id')
      .where('issue_id', req.params.id)
      .orderBy('created_at', 'desc');

    const formatted = issueStatus?.map((status) => ({
      id: status.id,
      status: {
        id: status.status_id,
        label: status.status_label,
      },
      created_from: {
        id: status.user_id,
        first_name: status.user_first_name,
        last_name: status.user_last_name,
      },
      created_at: status.created_at,
    }));
    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};
