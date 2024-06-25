import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listUserIssues
 *
 * @description     Returns all issues currently stored in database for specific user
 * @route           GET /api/v1/issues/user/:id
 * @access          Student, Tutor, Admin
 */

export const listUserIssues = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const issues = await db('issue')
      .join('users as creator', 'issue.created_from', 'creator.id')
      .join('course', 'issue.course_id', 'course.id')
      .leftJoin('category', 'issue.category_id', 'category.id')
      .leftJoin('users as assignee', 'issue.assigned_to', 'assignee.id')
      .select(
        'issue.*',
        'creator.first_name as creator_first',
        'creator.last_name as creator_last',
        'creator.email as creator_email',
        'category.id as category_id',
        'category.label as category_label',
        'category.description as category_description',
        'creator.matrikel_nr as creator_matrikel_nr',
        'assignee.first_name as assignee_first',
        'assignee.last_name as assignee_last',
        'assignee.email as assignee_email',
        'course.id as course_id',
        'course.code as course_code',
        'course.title as course_title'
      )
      .where('issue.created_from', req.body.auth.id)
      .orWhere('issue.assigned_to', req.body.auth.id);

    const formatted: IIssueReceive[] = issues.map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      course: {
        id: issue.course_id,
        code: issue.course_code,
        title: issue.course_title,
      },
      category: {
        id: issue.category_id,
        label: issue.category_label,
        description: issue.category_description,
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
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};
