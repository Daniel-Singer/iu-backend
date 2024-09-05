import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * createCourse
 *
 * @description     Adds new course row to table course in database
 * @route           POST /api/v1/courses
 * @access          Admin
 */

export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, title, tutor_id, auth } = req.body;
    // check if course exists
    const course = await db('course').where('code', code).first();
    if (course) {
      res.status(409);
      throw new Error(`Ein Kurs mit Code ${code} existiert bereits`);
    } else {
      const tutor = auth.role === 'tutor' ? auth.id : tutor_id;
      const [courseId] = await db('course').insert({
        code,
        title,
        tutor_id: tutor,
      });

      const course = await db('course')
        .leftJoin('users', 'course.tutor_id', 'users.id')
        .select(
          'course.*',
          'users.id as tutor_id',
          'users.first_name as tutor_first_name',
          'users.last_name as tutor_last_name',
          'users.email as tutor_email'
        )
        .where('course.id', courseId)
        .first();

      const resBody = {
        id: course?.id,
        code,
        title,
        tutor: {
          id: course.tutor_id,
          first_name: course.tutor_first_name,
          last_name: course.tutor_last_name,
        },
        issues: [],
      };

      res.status(201).json(resBody);
    }
  } catch (error) {
    next(error);
  }
};
