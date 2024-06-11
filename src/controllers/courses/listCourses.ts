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
    const courses = await db.select('*').from('course');

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
