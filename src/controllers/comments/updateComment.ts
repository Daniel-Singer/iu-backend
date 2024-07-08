import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * updateComment
 *
 * @description     Updates comment row in database. Can only be updated by the user who created comment, the
 *                  related Tutor or an administrator
 *
 * @route           PUT /api/v1/comments/:id
 * @access          Private, Admin
 */

export const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO - Implement validation to check if any update data was provided
    const { auth, ...update } = req.body;
    await db('comment')
      .where({ id: req.params.id })
      .first()
      .update({ ...update });
    const comment = await db('comment').where({ id: req.params.id }).first();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};
