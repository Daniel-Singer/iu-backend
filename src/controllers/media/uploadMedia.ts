import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * uploadMedia
 *
 * @description     Uploads media to related issue
 * @route           POST /api/v1/media/issue/:id
 * @access          Private
 */

export const uploadMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // find issue
    const issue = await db('issue').where({ id: req.params.id });
    res.status(200).json(issue);
  } catch (error) {
    next(error);
  }
};
