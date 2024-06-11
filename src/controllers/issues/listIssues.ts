import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listIssues
 *
 * @description     Returns all issues currently stored in database
 * @route           GET /api/v1/issues
 * @access          Student, Tutor, Admin
 */

interface IIssueQuery {
  [key: string]: Promise<any>;
}

export const listIssues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.body.auth;

    const issueQueries: IIssueQuery = {
      admin: db.select('*').from('issue'),
      student: db.select('*').from('issue').where('created_from', auth.id),
      tutor: db
        .select('+')
        .from('issue')
        .where('assigned_to', auth.id)
        .orWhere('created_from', auth.id),
    };

    const issues = await issueQueries[auth.role];

    res.status(200).json(issues);
  } catch (error) {
    next(error);
  }
};
