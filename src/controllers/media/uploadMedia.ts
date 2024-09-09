import { Request, Response, NextFunction } from 'express';
import { db } from '../../config/db';
import { MEDIA_UPLOAD_BODY, NOTIFICATION_HEAD } from '../../config/constants';

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
  const trx = await db.transaction();
  try {
    const { auth } = req.body;
    // find issue
    const issue: IIssueReceive = await db('issue')
      .where({ id: req.params.id })
      .first();
    if (issue) {
      if (req.file) {
        const { path, originalname, mimetype } = req.file;

        // create issue media row
        await trx('issue_media_file').insert({
          file_path: path,
          issue_id: issue.id!,
          name: originalname,
          mimetype,
        });

        if (auth.id === issue.created_from) {
          await trx('notification').insert({
            recipient_id: issue.assigned_to!,
            issue_id: issue.id!,
            subject: 'Neue Datei hinzugefügt',
            head: NOTIFICATION_HEAD['tutor'],
            body: MEDIA_UPLOAD_BODY('tutor', issue.title!),
            footer: 'Vielen Dank! <br />Ihr Korrekturmanagement-Team',
          });
        }
        if (auth.id === issue.assigned_to) {
          await trx('notification').insert({
            recipient_id: issue.created_from!,
            issue_id: issue.id!,
            subject: 'Neue Datei hinzugefügt',
            head: NOTIFICATION_HEAD['student'],
            body: MEDIA_UPLOAD_BODY('student', issue.title!),
            footer: 'Vielen Dank! <br />Dein Korrekturmanagement-Team',
          });
        }

        await trx.commit();

        res.sendStatus(200);
      } else {
        res.status(409);
        throw new Error('Keine Datei für Upload bereitgestellt');
      }
    } else {
      res.status(404);
      throw new Error('Die von Ihnen gesuchte Fehlermeldung existiert nicht');
    }
  } catch (error) {
    await trx.rollback();
    next(error);
  }
};
