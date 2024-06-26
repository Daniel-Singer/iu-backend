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
    // const courses = await db.select('*').from('course');

    const courses = await db('course')
      .leftJoin('users', 'course.tutor_id', 'users.id')
      .select(
        'course.*',
        'users.first_name as tutor_first_name',
        'users.last_name as tutor_last_name'
      );

    const formatted = courses.map((course) => ({
      id: course.id,
      code: course.code,
      title: course.title,
      tutor: {
        id: course.tutor_id,
        first_name: course.tutor_first_name,
        last_name: course.tutor_last_name,
      },
    }));
    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};
