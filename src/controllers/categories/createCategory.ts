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
    // TODO - Methode implementieren um festzustellen ob es eine Kategorie mit gegebener Bezeichnung bereits gibt
    const { auth, ...rest } = req.body;
    const [categoryId] = await db('category').insert(rest);
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
    next(error);
  }
};
