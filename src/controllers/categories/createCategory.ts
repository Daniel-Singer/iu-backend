import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * createCategory
 *
 * @description     Creates new category row in categories table
 * @route           POST /api/v1/categories
 * @access          Admin
 */

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [categoryId] = await db('category').insert(req.body);
    if (categoryId) {
      const category = await db
        .select('id', 'label', 'description')
        .from('category')
        .where({ id: categoryId })
        .first();
      res.status(201).json(category);
    } else {
      res.status(400);
      throw new Error();
    }
  } catch (error: any) {
    error.message = 'Kategorie konnte nicht hinzugefügt werden';
    next(error);
  }
};
