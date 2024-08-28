import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * listFaqs
 *
 * @description     Returns all elements of faq table from db
 * @route           GET /api/v1/faqs
 * @access          Private
 */

export const listFaqs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const faqs = await db('faq');
    res.status(200).json(faqs);
  } catch (error) {
    next(error);
  }
};
