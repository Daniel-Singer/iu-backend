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
    const { auth, ...rest } = req.body;

    const category: ICategoryBase | undefined = await db('category')
      .where('label', rest.label)
      .first();

    if (category) {
      res.status(409);
      throw new Error(`Die Kategorie ${rest.label} existiert bereits`);
    } else {
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
    }
  } catch (error: any) {
    next(error);
  }
};
