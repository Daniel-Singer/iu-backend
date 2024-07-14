import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * createComment
 *
 * @description     Creates new comment row in categories table.
 * @route           POST /api/v1/comments
 * @access          Admin
 */

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trx = await db.transaction();
  try {
    const { issue_id, auth } = req.body;
    // find issue and check if user is creator or assignee
    const issue: any = await db('issue')
      .where('id', issue_id)
      .andWhere((builder) => {
        builder
          .where('created_from', req.body.auth.id)
          .orWhere('assigned_to', req.body.auth.id);
      })
      .first();

    if (!!issue) {
      // created comment
      const [commentId] = await trx('comment').insert({
        text: req.body.text,
        created_from: req.body.auth.id,
        issue_id: issue.id,
      });
      // create seen_by_user entry
      await trx('comment_seen_by_user').insert({
        comment_id: commentId,
        user_id: auth.id,
      });

      // commit transaction if both operations are successfull
      await trx.commit();

      // select newly created comment
      const comment: any = await db
        .select('*')
        .from('comment')
        .where('id', commentId);
      res.status(201).json(comment);
    } else {
      res.status(400);
      throw new Error('Kommentar konnte nicht angelegt werden');
    }
  } catch (error: any) {
    await trx.rollback();
    next(error);
  }
};
