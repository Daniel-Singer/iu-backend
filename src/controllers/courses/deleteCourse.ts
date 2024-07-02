import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * deleteCourse
 *
 * @description     Deletes course row from database
 * @route           DELETE /api/v1/courses/:id
 * @access          Admin
 */

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // find issue
    const course: ICourseBase = await db('course')
      .where('id', req.params.id)
      .first();

    if (course) {
      await db('course').where('id', req.params.id).del();
      res.status(200).json(course);
    } else {
      res.status(404);
      throw new Error('Kurs konnte nicht gefunden werden');
    }
  } catch (error) {
    next(error);
  }
};
