import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';
import { isCreator } from '../../utils/isCreator';

/**
 * deleteComment
 *
 * @description     Deletes comment entry in database. Is only possible if the requesting user is either the creator or an admin
 * @route           GET /api/v1/comments
 * @access          Private
 */

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { issue_id } = req.params;
    const comment = await db('comment')
      .where('created_from', req.body.auth.id)
      .andWhere('id', issue_id)
      .first();
    const createdFromUser = isCreator(comment?.created_from!, req.body.auth.id);

    // only delete the comment if requesting user is creator or admin
    if (createdFromUser || req.body.auth.role === 'admin') {
      await db('comment').where('id', issue_id);
      res.status(200).json(comment);
    } else {
      res.status(403);
      throw new Error('Keine Berechtigung den Kommentar zu löschen.');
    }
  } catch (error) {
    next(error);
  }
};
