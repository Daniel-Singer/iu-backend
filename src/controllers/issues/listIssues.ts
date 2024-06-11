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
      admin: db('issue')
        .join('users as creator', 'issue.created_from', 'creator.id')
        .leftJoin('users as assignee', 'issue.assigned_to', 'assignee.id')
        .select(
          'issue.*',
          'creator.first_name as creator_first',
          'creator.last_name as creator_last',
          'creator.email as creator_email',
          'creator.matrikel_nr as creator_matrikel_nr',
          'assignee.first_name as assignee_first',
          'assignee.last_name as assignee_last',
          'assignee.email as assignee_email'
        ),
      student: db('issue').where('created_from', auth.id),
      tutor: db
        .select('+')
        .from('issue')
        .where('assigned_to', auth.id)
        .orWhere('created_from', auth.id),
    };

    const issues = await issueQueries[auth.role];

    const formatted = issues.map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      created_from:
        auth.role === 'admin' || auth.role === 'tutor'
          ? {
              id: issue.created_from,
              first_name: issue.creator_first,
              last_name: issue.creator_last,
              email: issue.creator_email,
              matrikel_nr: issue.creator_matrikel_nr,
            }
          : undefined,
      assinged_to: {
        id: issue.assigned_to,
        first_name: issue.assignee_first,
        last_name: issue.assignee_last,
        email: issue.assignee_email,
      },
    }));

    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};
