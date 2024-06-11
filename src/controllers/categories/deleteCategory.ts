import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * deleteCategory
 *
 * @description     Deletes category based on id provided
 * @route           DELETE /api/v1/categories
 * @access          Admin
 */

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category: ICategoryBase = await db('category').where({ id }).first();
    if (!category) {
      res.status(404);
      throw new Error('Kategorie existiert nicht');
    } else {
      await db('category').where('id', id).del();
      res.status(200).json(category);
    }
  } catch (error) {
    next(error);
  }
};
