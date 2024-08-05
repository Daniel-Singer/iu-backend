import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * getIssue
 *
 * @description     Returns single issue row from database
 * @route           GET /api/v1/issues/:id
 * @access          Private, Owner, Admin
 */

export const getIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO - Implement condition to check if auth user is owner, assigned tutor or admin
    const issue = await db('issue')
      .select([
        'issue.*',
        'course.code as course_code',
        'course.title as course_title',
        'course.tutor_id as course_tutor_id',
        'users.id as tutor_id',
        'users.first_name as tutor_first_name',
        'users.last_name as tutor_last_name',
      ])
      .leftJoin('course', 'issue.course_id', 'course.id')
      .leftJoin('users', 'course.tutor_id', 'users.id')
      .where('issue.id', req.params.id)
      .first();

    const issueMedia = await db('issue_media')
      .select(['id', 'url', 'label', 'media_type', 'page', 'line', 'timestamp'])
      .where('issue_id', issue.id);

    const issueStatus = await db('issue_status')
      .select(['status.id', 'status.label'])
      .join('status', 'issue_status.status_id', 'status.id')
      .where('issue_id', issue.id)
      .orderBy('created_at', 'desc')
      .first();

    const formatted = {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      course: {
        id: issue.course_id,
        code: issue.course_code,
        title: issue.course_title,
        tutor: {
          id: issue.course_tutor_id,
          first_name: issue.tutor_first_name,
          last_name: issue.tutor_last_name,
        },
      },
      issue_media: issueMedia,
      status: issueStatus,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};
