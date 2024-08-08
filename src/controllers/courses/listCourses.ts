import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listCourses
 *
 * @description     Returns all courses currently stored in database
 * @route           GET /api/v1/courses
 * @access          Private
 */

export const listCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await db('course')
      .leftJoin('users', 'course.tutor_id', 'users.id')
      .leftJoin('issue', 'course.id', 'issue.course_id')
      .select(
        'course.*',
        'users.first_name as tutor_first_name',
        'users.last_name as tutor_last_name',
        'users.email as tutor_email'
      )
      .count('issue.course_id as issue_count')
      .groupBy('course.id');

    const formatted = courses?.map((course) => ({
      id: course.id,
      code: course.code,
      title: course.title,
      active: course.active,
      tutor: {
        id: course.tutor_id,
        first_name: course.tutor_first_name,
        last_name: course.tutor_last_name,
        email: course.tutor_email,
      },
      issues: {
        count: course.issue_count,
      },
    }));
    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};
