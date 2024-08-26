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
        // check if issue_media entry already exists
        const issue_media = await db('issue_media')
          .where({ issue_id: req.params.id })
          .first();
        if (!issue_media) {
          const issue_media = await db('issue_media').insert({
            file_path: req.file.path,
            issue_id: req.params.id,
            media_label: req.file.originalname,
            mimetype: req.file.mimetype,
          });
          res.status(201).json({
            issue: {
              id: issue.id,
              tite: issue.title,
            },
            ...issue_media,
          });
        } else {
          await db('issue_media').update({
            file_path: req.file.path,
            media_label: req.file.originalname,
            mimetype: req.file.mimetype,
          });
          res.status(200).json({
            issue: {
              id: issue.id,
              tite: issue.title,
            },
            ...issue_media,
          });
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
    next(error);
  }
};
