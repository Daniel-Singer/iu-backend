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

    let issue: IIssueReceive;

    if (auth.role !== 'admin') {
      issue = await db('issue')
        .where('id', issue_id)
        .andWhere((builder) => {
          builder
            .where('created_from', req.body.auth.id)
            .orWhere('assigned_to', req.body.auth.id);
        })
        .first();
    } else {
      issue = await db('issue').where('id', issue_id).first();
    }

    if (!!issue) {
      // created comment
      const [commentId] = await trx('comment').insert({
        text: req.body.text,
        created_from: req.body.auth.id,
        issue_id: issue?.id!,
      });
      // create seen_by_user entry
      await trx('comment_seen_by_user').insert({
        comment_id: commentId,
        user_id: auth.id,
      });

      await trx('notification').insert({
        recipient_id:
          auth.id === issue?.created_from
            ? issue.assigned_to
            : issue.created_from,
        issue_id: issue?.id,
        subject: `Neuer Kommentar zu Meldung #${issue?.id}`,
        head: `Liebe/r Studierende/r`,
        body: ` Ihrer Meldung mit der ID 
                ${issue?.id} zum Thema ${issue?.title} wurde ein neuer Kommentar hinzugefügt.`,
        footer: `Vielen Dank! <br />Ihr Korrekturmanagement-Team`,
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
