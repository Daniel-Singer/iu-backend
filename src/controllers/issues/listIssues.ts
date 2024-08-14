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
    // find issues
    const issues = await db('issue')
      .join('users as creator', 'issue.created_from', 'creator.id')
      .join('course', 'issue.course_id', 'course.id')
      .leftJoin('users as assignee', 'issue.assigned_to', 'assignee.id')
      .select(
        'issue.*',
        'creator.first_name as creator_first',
        'creator.last_name as creator_last',
        'creator.email as creator_email',
        'creator.matrikel_nr as creator_matrikel_nr',
        'assignee.first_name as assignee_first',
        'assignee.last_name as assignee_last',
        'assignee.email as assignee_email',
        'course.id as course_id',
        'course.code as course_code',
        'course.title as course_title',
        'course.active as course_active',
        db.raw(`(
          SELECT status.id
          FROM issue_status
          JOIN status ON issue_status.status_id = status.id
          WHERE issue_status.issue_id = issue.id
          ORDER BY issue_status.created_at DESC
          LIMIT 1
          ) as latest_status_id`),
        db.raw(`(
                  SELECT status.description
                  FROM issue_status
                  JOIN status ON issue_status.status_id = status.id
                  WHERE issue_status.issue_id = issue.id
                  ORDER BY status.created_at DESC
                  LIMIT 1
          ) as latest_status`)
      )
      .orderBy('id', 'desc');

    const formatted: IIssueReceive[] = issues.map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      course: {
        id: issue.course_id,
        code: issue.course_code,
        title: issue.course_title,
        active: issue.course_active,
      },
      created_from: {
        id: issue.created_from,
        first_name: issue.creator_first,
        last_name: issue.creator_last,
        email: issue.creator_email,
        matrikel_nr: issue.creator_matrikel_nr,
      },
      assigned_to: {
        id: issue.assigned_to,
        first_name: issue.assignee_first,
        last_name: issue.assignee_last,
        email: issue.assignee_email,
      },
      status: {
        id: issue.latest_status_id,
        label: issue.latest_status_label,
      },
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};
