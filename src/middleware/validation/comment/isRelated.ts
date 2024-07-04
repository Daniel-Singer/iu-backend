import { Request, Response, NextFunction } from 'express';
import { db } from '../../../config/db';

/**
 * isRelated
 *
 * @description     Validates if requesting user is either creator of issue or the related tutor.
 *                  If admin looks at comment, no timestamp will be set at seen_by_student or seen_by_tutor
 */

export const isRelated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { auth } = req.body;
    const { id } = req.params;
    // find comment
    const comment = await db('comment').where({ id }).first();

    if (comment) {
      // check if requesting user is either creator, tutor or admin
      if (comment.created_from === auth.id) {
        req.body.seenby = auth.role;
        next();
      } else if (auth.role === 'admin') {
        res.sendStatus(204);
      } else {
        // is id of related tutor
        const issue = await db('issue').where({ id: comment.issue_id }).first();
        if (issue) {
          // is tutor_id same as requesting user
          if (issue.tutor_id === id) {
            next();
          } else {
            res.status(401);
            throw new Error('Keine Zugriffsberechtigung');
          }
        } else {
          res.status(404);
          throw new Error(
            'Verwandte Fehlermeldung konnte nicht gefunden werden'
          );
        }
      }
    } else {
      res.status(404);
      throw new Error('Kommentar konnte nicht gefunden werden');
    }
  } catch (error) {
    next(error);
  }
};
