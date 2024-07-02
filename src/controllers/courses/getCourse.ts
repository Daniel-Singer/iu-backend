import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * getCourse
 *
 * @description     Returns course row from database
 * @route           GET /api/v1/courses/:id
 * @access          Private, Admin
 */

export const getCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // find the course and responsible tutor
    const course = await db('course')
      .leftJoin('users', 'course.tutor_id', 'users.id')
      .select(
        'course.*',
        'users.id as tutor_id',
        'users.first_name as tutor_first_name',
        'users.last_name as tutor_last_name',
        'users.email as tutor_email'
      )
      .where('course.id', req.params.id)
      .first();

    if (course) {
      // find all issues for this course

      const issues = await db('issue').where('course_id', course.id);

      const { id, code, title } = course;
      const resBody = {
        id,
        code,
        title,
        tutor: {
          id: course.tutor_id,
          first_name: course.tutor_first_name,
          last_name: course.tutor_last_name,
        },
        issues,
      };
      res.status(200).json(resBody);
    } else {
      res.status(404);
      throw new Error('Der von dir gesuchte Kurs existiert nicht');
    }
  } catch (error) {
    next(error);
  }
};
