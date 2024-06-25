import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * updateCourse
 *
 * @description     Updates course row stored in database
 * @route           PUT /api/v1/courses/:id
 * @access          Admin
 */

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth, ...update } = req.body;
    if (Object.keys(update).length < 1) {
      res.status(400);
      throw new Error('Bitte Daten für Update bereitstellen');
    } else {
      await db('course')
        .where({ id: req.params.id })
        .first()
        .update({ ...update });
      const course = await db('course').where({ id: req.params.id }).first();

      res.status(200).json(course);
    }
  } catch (error) {
    next(error);
  }
};
