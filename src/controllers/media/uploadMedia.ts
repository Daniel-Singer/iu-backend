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
    const issue: IIssueReceive = await db('issue')
      .where({ id: req.params.id })
      .first();
    if (issue) {
      if (req.file) {
        // check if a file for given issue already exists
        const issue_file = await db('issue_media_file')
          .where({ issue_id: issue.id })
          .first();
        if (issue_file) {
          res.status(409);
          throw new Error(
            `Es wurde bereits eine Datei für gegebene Fehlermeldung hinterlegt`
          );
        } else {
          const { path, originalname, mimetype } = req.file;
          await db('issue_media_file').insert({
            file_path: path,
            issue_id: issue.id!,
            name: originalname,
            mimetype,
          });
          res.sendStatus(200);
        }
      } else {
        res.status(409);
        throw new Error('Keine Datei für Upload bereitgestellt');
      }
    } else {
      res.status(404);
      throw new Error('Die von Ihnen gesuchte Fehlermeldung existiert nicht');
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
