import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';

/**
 * updateIssue
 *
 * @description     Updates issue in database
 * @route           PUT /api/v1/issues/:id
 * @access          Private, User, Admin
 */

export const updateIssue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const trx = await db.transaction();
  try {
    const { auth, status, reason, ...update } = req.body;

    const issue = await db('issue').where({ id: req.params.id }).first();
    if (issue) {
      if (Object.keys(update).length > 0 || status) {
        // handle update
        if (Object.keys(update).length > 0) {
          await trx('issue')
            .where({ id: req.params.id })
            .first()
            .update({ ...update });

          // send notification to user if user is not the one who changed it
          if (auth.id !== issue.created_from) {
            await trx('notification').insert({
              recipient_id: issue?.created_from,
              issue_id: issue?.id!,
              subject: 'Meldung wurde bearbeitet',
              head: 'Liebe/r Studierende/r',
              body: `Ihre Meldung zum Thema <strong>"${issue?.title}"</strong> wurde bearbeitet.`,
              footer: `Vielen Dank! <br />Ihr Korrekturmanagement-Team`,
            });
          }

          // send notification to tutor in case tutor is not the changing user
          if (auth.id !== issue.assigned_to) {
            await trx('notification').insert({
              recipient_id: issue?.created_from,
              issue_id: issue?.id!,
              subject: 'Meldung wurde bearbeitet',
              head: 'Liebe/r Tutor/in',
              body: `Die Ihnen zugewiesenen Meldung zum Thema <strong>"${issue?.title}"</strong> wurde bearbeitet.`,
              footer: `Vielen Dank! <br />Ihr Korrekturmanagement-Team`,
            });
          }
        }
        // handle status change
        if (status) {
          await trx('issue_status').insert({
            issue_id: issue.id,
            status_id: status.id,
            created_from: auth.id,
            reason: reason && reason !== '' ? reason : null,
          });
        }
        await trx.commit();
        res.status(201).json(issue);
      } else {
        res.status(400);
        throw new Error('Bitte Daten für Update bereitstellen');
      }
    } else {
      res.status(404);
      throw new Error('Update fehlgeschlagen! Fehlermeldung existiert nicht');
    }
  } catch (error) {
    await trx.rollback();
    next(error);
  }
};
