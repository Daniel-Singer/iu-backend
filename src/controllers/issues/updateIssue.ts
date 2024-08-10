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
        res.sendStatus(201);
      } else {
        res.status(400);
        throw new Error('Bitte Daten für Update bereitstellen');
      }
    } else {
      res.status(404);
      throw new Error('Update fehlgeschlagen! Fehlermeldung existiert nicht');
    }
  } catch (error) {
    console.log(error);
    await trx.rollback();
    next(error);
  }
};
