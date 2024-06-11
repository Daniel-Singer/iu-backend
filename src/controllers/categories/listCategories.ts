import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listCategories
 *
 * @description     Returns all categories currently stored in database
 * @route           GET /api/v1/categories
 * @access          Student, Tutor, Admin
 */

export const listCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories: ICategoryBase = await db
      .select('id', 'label', 'description')
      .from('category');
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
