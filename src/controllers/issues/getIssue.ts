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
        'tutor.id as tutor_id',
        'tutor.first_name as tutor_first_name',
        'tutor.last_name as tutor_last_name',
        'creator.id as created_from_id',
        'creator.first_name as created_from_first_name',
        'creator.last_name as created_from_last_name',
      ])
      .leftJoin('course', 'issue.course_id', 'course.id')
      .leftJoin('users as tutor', 'course.tutor_id', 'tutor.id')
      .leftJoin('users as creator', 'issue.created_from', 'creator.id')
      .where('issue.id', req.params.id)
      .first();

    const issueMedia = await db('issue_media')
      .select(['id', 'url', 'page', 'line', 'timestamp'])
      .where('issue_id', issue.id);

    const issueStatus = await db('issue_status')
      .select(['status.id', 'status.label', 'issue_status.reason'])
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
      reason: issueStatus.reason,
      created_from: {
        id: issue.created_from_id,
        first_name: issue.created_from_first_name,
        last_name: issue.created_from_last_name,
      },
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
    res.status(200).json(formatted);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
