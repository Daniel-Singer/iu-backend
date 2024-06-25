import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * updateCategory
 *
 * @description     Updates category row in categories table
 * @route           PUT /api/v1/categories
 * @access          Admin
 */

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { auth, ...update } = req.body;
  try {
    if (Object.keys(update).length < 1) {
      res.status(400);
      throw new Error('Bitte Daten für Update bereitstellen');
    } else {
      const categoryToUpdate = await db('category')
        .where({ id: req.params.id })
        .first()
        .update({
          ...update,
        });
      const category = await db('category')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(category);
    }
  } catch (error: any) {
    next(error);
  }
};
