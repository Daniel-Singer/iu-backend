import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listIssuesByCourse
 *
 * @description     Returns all issues currently stored in database
 * @route           GET /api/v1/issues
 * @access          Student, Tutor, Admin
 */

interface IIssueQuery {
  [key: string]: Promise<any>;
}

export const listIssuesByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // find issues

    const issues = await db('issue')
      .join('users as creator', 'issue.created_from', 'creator.id')
      .leftJoin('category', 'category.id', 'issue.category_id')
      .leftJoin('users as assignee', 'issue.assigned_to', 'assignee.id')
      .select([
        'issue.*',
        'category.label as category_label',
        'creator.first_name as creator_first',
        'creator.last_name as creator_last',
        'assignee.first_name as assignee_first',
        'assignee.last_name as assignee_last',
        db.raw(`(
            SELECT status.id
            FROM issue_status
            JOIN status ON issue_status.status_id = status.id
            WHERE issue_status.issue_id = issue.id
            ORDER BY issue_status.created_at DESC
            LIMIT 1
            ) as latest_status_id`),
        db.raw(`(
                    SELECT status.label
                    FROM issue_status
                    JOIN status ON issue_status.status_id = status.id
                    WHERE issue_status.issue_id = issue.id
                    ORDER BY issue_status.created_at DESC
                    LIMIT 1
                ) as latest_status_label`),
      ])
      .where({ course_id: req.params.id });

    const formatted = issues?.map((issue) => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      created_from: {
        id: issue.created_from,
        first_name: issue.creator_first,
        last_name: issue.creator_last,
      },
      assigned_to: {
        id: issue.assigned_to,
        first_name: issue.assignee_first,
        last_name: issue.assignee_last,
      },
      category: {
        id: issue.category_id,
        label: issue.category_label,
      },
      status: {
        id: issue.latest_status_id,
        label: issue.latest_status_label,
      },
    }));

    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};
